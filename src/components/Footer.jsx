import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-subtle-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-main">EventSphere Platform</span>
            <span>•</span>
            <span>OJUS Student Festival 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-olive-800 transition-colors">Festival Schedule</Link>
            <Link to="/teams" className="hover:text-olive-800 transition-colors">11 Operational Teams</Link>
            <Link to="/auth" className="hover:text-olive-800 transition-colors">RBAC Portal Access</Link>
          </div>

          <div className="text-right">
            <span>Enterprise Multi-Tier Architecture • All Rights Reserved</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
