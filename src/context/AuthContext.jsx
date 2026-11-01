import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, flaskApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eventsphere_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('eventsphere_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && user) {
      // Background verify profile with backend if online, but don't log out if backend is offline
      flaskApi.get('/user/profile')
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('eventsphere_user', JSON.stringify(res.data));
          }
        })
        .catch(() => {
          // Keep existing authenticated state on static deployment
        });
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const result = await authenticateUser(username, password);
      
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('eventsphere_token', result.token);
      localStorage.setItem('eventsphere_user', JSON.stringify(result.user));
      
      return { success: true, user: result.user };
    } catch (err) {
      const errorMsg = err.message || err.response?.data?.error || 'Invalid credentials. Please verify your username and password.';
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
