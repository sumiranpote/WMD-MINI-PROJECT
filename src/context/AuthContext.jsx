import React, { createContext, useContext, useState, useEffect } from 'react';
import { flaskApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eventsphere_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('eventsphere_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      // Re-fetch profile on mount if token exists
      flaskApi.get('/user/profile')
        .then((res) => {
          setUser(res.data);
          localStorage.setItem('eventsphere_user', JSON.stringify(res.data));
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await flaskApi.post('/login', { username, password });
      const { token: jwtToken, user: userProfile } = response.data;
      
      setToken(jwtToken);
      setUser(userProfile);
      localStorage.setItem('eventsphere_token', jwtToken);
      localStorage.setItem('eventsphere_user', JSON.stringify(userProfile));
      
      return { success: true, user: userProfile };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Invalid credentials. Please verify your username and password.';
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('eventsphere_token');
    localStorage.removeItem('eventsphere_user');
  };

  const getPortalRoute = (role = user?.role) => {
    if (role === 'admin') return '/portal/admin';
    if (role === 'event_head') return '/portal/lead';
    return '/portal/volunteer';
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token && !!user,
      loading,
      login,
      logout,
      getPortalRoute,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
