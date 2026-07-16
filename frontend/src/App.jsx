import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import BgOrbs from './components/BgOrbs';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

// Redirect authenticated users away from auth pages
function PublicRoute({ children }) {
  const { user, initialLoading } = useAuth();
  if (initialLoading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppLayout() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-gray-200 overflow-hidden flex flex-col font-sans">
      <BgOrbs />
      <Navbar />

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public auth routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] text-gray-600 border-t border-white/5 relative z-10 select-none">
        <p>© {new Date().getFullYear()} Antigravity Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
