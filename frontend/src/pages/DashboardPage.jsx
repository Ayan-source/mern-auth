import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleLogout = async () => {
    await logout();
    setToast({ message: 'Session terminated. See you soon!', type: 'success' });
    setTimeout(() => navigate('/login'), 800);
  };

  if (!user) return null;

  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <div className="w-full max-w-4xl flex flex-col space-y-8 text-left">

        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome Back,{' '}
              <span className="font-serif italic font-normal text-indigo-400">
                {user.firstname}
              </span>
            </h1>
            <p className="text-sm text-gray-500 font-light mt-1">
              Manage your authentication credentials and profile parameters.
            </p>
          </div>
          <button
            id="dashboard-logout"
            onClick={handleLogout}
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-red-900/40 to-red-950/60 border border-red-500/20 hover:border-red-500/40 text-red-200 text-xs font-semibold hover:text-red-100 active:scale-[0.99] cursor-pointer transition-all"
          >
            Terminate Session
          </button>
        </div>

        {/* Profile Grid Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Role & Status Widget */}
          <div className="glass rounded-xl p-6 flex flex-col space-y-4">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              Account Role & Status
            </span>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-serif italic text-lg font-bold select-none">
                {user.Role ? user.Role[0].toUpperCase() : 'U'}
              </div>
              <div>
                <div className="font-semibold text-white capitalize text-sm">{user.Role || 'User'}</div>
                <div className="text-[10px] text-gray-500">Privilege Class</div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-light">Email Status</span>
              {user.isVerified ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 uppercase">
                  Verified
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-300 uppercase">
                  Unverified
                </span>
              )}
            </div>
          </div>

          {/* Identity Widget */}
          <div className="glass rounded-xl p-6 flex flex-col space-y-4">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              Identity Details
            </span>
            <div className="space-y-3">
              {[
                { label: 'Full Name', value: `${user.firstname} ${user.lastname}` },
                {
                  label: 'Birthday',
                  value: user.DOB
                    ? new Date(user.DOB).toLocaleDateString(undefined, { dateStyle: 'medium' })
                    : 'N/A',
                },
                { label: 'Calculated Age', value: user.Age ? `${user.Age} years` : 'N/A' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-gray-500 font-light">{label}</span>
                  <span className="text-white font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Widget */}
          <div className="glass rounded-xl p-6 flex flex-col space-y-4">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
              Security Profile
            </span>
            <div className="space-y-3">
              <div className="flex justify-between text-xs items-center gap-2">
                <span className="text-gray-500 font-light shrink-0">System ID</span>
                <span className="font-mono text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded select-all truncate">
                  {user._id}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-light">Registered On</span>
                <span className="text-white font-medium">
                  {user.CreatedAt
                    ? new Date(user.CreatedAt).toLocaleDateString(undefined, { dateStyle: 'medium' })
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-light">Email</span>
                <span className="text-white font-medium truncate max-w-[150px]">{user.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Cards */}
        <div className="glass rounded-2xl p-6 md:p-8 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-2">Secure Workspace</h2>
          <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
            Your authenticated session is active. Connect to secondary microservices or manage secure user functions from here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Access Tokens',
                desc: 'Inspect, issue, or revoke token integrations for third party services.',
                cta: 'Configure Integration',
              },
              {
                title: 'Audit Logs',
                desc: 'Track login locations, browser details, and login timestamps.',
                cta: 'View Logs',
              },
            ].map(({ title, desc, cta }) => (
              <div
                key={title}
                className="p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors flex flex-col space-y-2"
              >
                <div className="text-xs font-semibold text-white">{title}</div>
                <p className="text-[11px] text-gray-500 font-light">{desc}</p>
                <button className="text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 w-fit pt-1 transition-colors cursor-not-allowed">
                  {cta} (Soon)
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
