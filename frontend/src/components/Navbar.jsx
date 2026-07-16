import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-12 border-b border-white/5 backdrop-blur-md bg-black/10">
      {/* Logo */}
      <Link to={user ? '/dashboard' : '/login'} className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 select-none">
          Ω
        </div>
        <span className="font-semibold text-lg tracking-tight text-white font-sans">
          Antigravity<span className="text-indigo-400">Auth</span>
        </span>
      </Link>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="hidden sm:block text-xs text-gray-400 font-light">
              Hi, <span className="text-white font-semibold">{user.firstname}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            {!isLogin && (
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
            )}
            {!isSignup && (
              <Link
                to="/signup"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
              >
                Register
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
