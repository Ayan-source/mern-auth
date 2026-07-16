import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setToast({ message: 'Please enter your email and password.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      setToast({ message: 'Welcome back! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/dashboard'), 600);
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Editorial Brand Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-300">
              Auth Service Active
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Welcome <br />
            <span className="font-serif italic font-normal text-indigo-400">Back.</span>
          </h1>

          <p className="text-gray-400 max-w-lg text-sm md:text-base font-light leading-relaxed">
            Sign in to your account and pick up exactly where you left off. Secure, fast, and always reliable.
          </p>

          <div className="pt-6 border-t border-white/5 max-w-md">
            <p className="text-xs uppercase text-gray-500 font-semibold tracking-widest mb-4">
              Secured by industry standards
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-55">
              <span className="text-sm font-semibold tracking-tight text-gray-400">JWT Sessions</span>
              <span className="text-sm font-semibold tracking-tight text-gray-400">Bcrypt Hash</span>
              <span className="text-sm font-semibold tracking-tight text-gray-400">HttpOnly Cookies</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="lg:col-span-5 w-full">
          <div className="glass rounded-2xl p-6 md:p-8 flex flex-col w-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Sign In</h2>
              <p className="text-xs text-gray-500 mt-1">Enter your credentials to access your workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500 focus:outline-none transition-all"
                />
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
