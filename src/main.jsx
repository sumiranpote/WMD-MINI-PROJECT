import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('EventSphere ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFBF9] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-rose-200 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 font-bold">
                !
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Application Notice</h2>
                <p className="text-xs text-gray-500">EventSphere recovered from an unexpected state</p>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded text-xs font-mono text-gray-700 overflow-x-auto">
              {this.state.error?.message || 'Unknown runtime error occurred.'}
            </div>

            <button
              onClick={() => {
                try {
                  localStorage.clear();
                  sessionStorage.clear();
                } catch (e) {}
                window.location.href = window.location.origin + window.location.pathname;
              }}
              className="w-full py-2.5 px-4 bg-[#3D4F2F] hover:bg-[#324027] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Session & Reload Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
