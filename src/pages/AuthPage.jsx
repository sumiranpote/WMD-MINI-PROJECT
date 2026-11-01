import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, Key, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export const AuthPage = () => {
  const { login, getPortalRoute } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide both your festival username and password.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    const result = await login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(getPortalRoute(result.user.role));
    } else {
      setError(result.error);
    }
  };

  const handleDemoFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white border border-subtle-border rounded-xl p-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-10 h-10 rounded-full bg-olive-50 border border-olive-200 items-center justify-center text-olive-800 mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-text-main tracking-tight">
            Portal Authentication
          </h2>
          <p className="text-xs text-text-muted">
            Access your festival operations dashboard based on your assigned role
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-main block">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="firstname_lastname (e.g. sumiran_pote)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-700 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-main block">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Default: Phone number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-canvas border border-subtle-border rounded focus:outline-none focus:border-olive-700 transition-colors"
              />
            </div>
            <span className="text-[10px] text-text-muted block">
              Default password for seeded personnel is their phone number.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-olive text-xs py-2.5 mt-2"
          >
            {isSubmitting ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast-Switcher */}
        <div className="pt-4 border-t border-subtle-border space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-text-muted uppercase tracking-wider">
            <span>Instant Demo Switcher</span>
            <Sparkles className="w-3 h-3 text-olive-700" />
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoFill('sumiran_pote', '7021041166')}
              className="text-left p-2.5 rounded bg-olive-50 border border-olive-200 hover:bg-olive-100 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-olive-900 block">Sumiran Deepak Pote (Admin)</span>
                <span className="text-[11px] text-olive-700 font-mono">sumiran_pote • 7021041166</span>
              </div>
              <span className="text-[10px] uppercase font-bold bg-white text-olive-800 px-2 py-0.5 rounded border border-olive-200">
                Admin
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('pranali_sawdekar', '8879099226')}
              className="text-left p-2.5 rounded bg-white border border-subtle-border hover:bg-stone-50 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-text-main block">Pranali Sawdekar (Event Head)</span>
                <span className="text-[11px] text-text-muted font-mono">pranali_sawdekar • Design Team</span>
              </div>
              <span className="text-[10px] uppercase font-bold bg-olive-50 text-olive-800 px-2 py-0.5 rounded border border-olive-200">
                Lead
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('vrunda_dujari', '7498058877')}
              className="text-left p-2.5 rounded bg-white border border-subtle-border hover:bg-stone-50 transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-text-main block">Vrunda Dujari (Volunteer)</span>
                <span className="text-[11px] text-text-muted font-mono">vrunda_dujari • Creative</span>
              </div>
              <span className="text-[10px] uppercase font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                Volunteer
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
