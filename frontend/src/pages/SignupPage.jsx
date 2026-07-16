import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-calculate age from DOB
  useEffect(() => {
    if (!dob) { setAge(''); return; }
    const birth = new Date(dob);
    const today = new Date();
    let calc = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) calc--;
    setAge(calc >= 0 ? calc : 0);
  }, [dob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password || !dob || age === '') {
      setToast({ message: 'Please fill in all required fields.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await signup({
        firstname,
        lastname,
        email,
        password,
        DOB: dob,
        Age: parseInt(age, 10),
        isVerified: false,
        Role: 'user',
      });
      setToast({ message: 'Account created! Redirecting...', type: 'success' });
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
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-300">
              Open Registration
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Create Your <br />
            <span className="font-serif italic font-normal text-cyan-400">Account.</span>
          </h1>

          <p className="text-gray-400 max-w-lg text-sm md:text-base font-light leading-relaxed">
            Join a platform built for performance. Your session is secured with industry-grade encryption and persistent HTTP-only cookies.
          </p>

          <ul className="space-y-3 pt-4 max-w-sm">
            {[
              'Auto-computed Age from your Date of Birth',
              'Password encrypted with bcrypt (salt rounds: 10)',
              'JWT token stored in HTTP-only cookie',
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-xs text-gray-400">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">✓</span>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* Signup Card */}
        <div className="lg:col-span-5 w-full">
          <div className="glass rounded-2xl p-6 md:p-8 flex flex-col w-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Create Account</h2>
              <p className="text-xs text-gray-500 mt-1">Fill in your details to get started in seconds.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                    First Name
                  </label>
                  <input
                    id="signup-firstname"
                    type="text"
                    required
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Jane"
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                    Last Name
                  </label>
                  <input
                    id="signup-lastname"
                    type="text"
                    required
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Doe"
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col text-left">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 flex flex-col text-left">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    id="signup-dob"
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition-all"
                  />
                </div>
                <div className="col-span-4 flex flex-col text-left">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1.5">
                    Age
                  </label>
                  <input
                    id="signup-age"
                    type="number"
                    readOnly
                    value={age}
                    placeholder="Auto"
                    className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-gray-400 text-center outline-none cursor-not-allowed select-none"
                  />
                </div>
              </div>

              <button
                id="signup-submit"
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
