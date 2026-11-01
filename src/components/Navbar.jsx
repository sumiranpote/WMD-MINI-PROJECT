import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkServicesHealth } from '../services/api';
import { Shield, Sparkles, User, LogOut, ArrowRight, Activity } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, getPortalRoute } = useAuth();
  const location = useLocation();
  const [health, setHealth] = useState({ flask: false, spring: false });

  useEffect(() => {
    checkServicesHealth().then(setHealth);
    const interval = setInterval(() => {
      checkServicesHealth().then(setHealth);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-subtle-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Festival Tag */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-olive-800 flex items-center justify-center text-white font-bold text-sm">
                ES
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base text-text-main tracking-tight leading-none group-hover:text-olive-800 transition-colors">
                  EventSphere
                </span>
                <span className="text-[11px] text-text-muted mt-0.5 font-medium tracking-wide">
                  OJUS Festival 2026
                </span>
              </div>
            </Link>

            {/* Microservice Live Status Pill */}
            <div className="hidden md:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded bg-olive-50 border border-olive-200 text-xs text-olive-800">
              <span className={`w-2 h-2 rounded-full ${health.flask ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-medium text-[11px]">
                {health.flask ? 'Core Auth Live (Port 5000)' : 'Flask Offline'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-6 text-sm font-medium">
            <Link
              to="/"
              className={`py-1.5 px-2.5 transition-colors ${
                isActive('/') 
                  ? 'text-olive-800 border-b-2 border-olive-800 font-semibold' 
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/teams"
              className={`py-1.5 px-2.5 transition-colors ${
                isActive('/teams') 
                  ? 'text-olive-800 border-b-2 border-olive-800 font-semibold' 
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              11 Teams
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-subtle-border">
                {/* Role Pill */}
                <Link
                  to={getPortalRoute()}
                  className="flex items-center gap-2 py-1 px-3 rounded-full bg-olive-100 border border-olive-200 text-olive-800 text-xs font-semibold hover:bg-olive-200 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="capitalize">
                    {user?.role === 'admin' ? 'Admin Portal' : user?.role === 'event_head' ? `Lead: ${user.team_name || 'Team'}` : 'Volunteer Pass'}
                  </span>
                  <ArrowRight className="w-3 h-3 text-olive-700" />
                </Link>

                {/* Sign Out */}
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-1.5 text-text-muted hover:text-rose-700 rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="pl-2 sm:pl-4 border-l border-subtle-border">
                <Link
                  to="/auth"
                  className="btn-olive text-xs sm:text-sm py-1.5 px-3.5"
                >
                  <span>Portal Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
};
