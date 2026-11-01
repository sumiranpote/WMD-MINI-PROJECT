import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, flaskApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('eventsphere_user');
      return saved && saved !== 'undefined' && saved !== 'null' ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('Failed reading eventsphere_user:', e);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    try {
      const saved = localStorage.getItem('eventsphere_token');
      return saved && saved !== 'undefined' && saved !== 'null' ? saved : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && user) {
      // Background verify profile with backend if online, but keep state if backend is offline
      flaskApi.get('/user/profile')
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            try {
              localStorage.setItem('eventsphere_user', JSON.stringify(res.data));
            } catch (e) {}
          }
        })
        .catch(() => {
          // Graceful fallback: maintain client authentication on static cloud deployment
        });
    }
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const result = await authenticateUser(username, password);
      
      setToken(result.token);
      setUser(result.user);

      try {
        localStorage.setItem('eventsphere_token', result.token);
        localStorage.setItem('eventsphere_user', JSON.stringify(result.user));
      } catch (storageErr) {
        console.warn('localStorage write failed:', storageErr);
      }
      
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
    try {
      localStorage.removeItem('eventsphere_token');
      localStorage.removeItem('eventsphere_user');
    } catch (e) {
      console.warn('localStorage removal failed:', e);
    }
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
