import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AUTH_CONFIG from '../auth/authConfig';
import { useToast } from '../context/ToastContext';
import { validateLogin } from '../utils/validators';
import { Loader } from '../components/ui/Loader';

export default function LoginPage() {
  const [email, setEmail] = useState('user@equicart.com');
  const [password, setPassword] = useState('demo123');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  const oidcEnabled = !!(AUTH_CONFIG.authority && AUTH_CONFIG.client_id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (oidcEnabled) {
      setLoading(true);
      try {
        await login();
      } catch (err) {
        toast(err?.message || 'Login failed', 'error');
      } finally {
        setLoading(false);
      }
      return;
    }

    const errs = validateLogin({ email, password });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const user = await login({ email, password });
      toast(`Welcome back, ${user.name}!`);
      navigate(user.role === 'admin' ? '/admin' : from);
    } catch (err) {
      toast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl"
    >
      <h1 className="font-heading text-2xl font-bold text-center">Welcome back</h1>
      <p className="text-center text-slate-500 text-sm mt-1 mb-6">Sign in to your EquiCart account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!oidcEnabled ? (
          <>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="you@company.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl btn-gradient flex items-center justify-center gap-2">
              {loading ? <Loader /> : 'Sign in'}
            </button>
          </>
        ) : (
          <div className="rounded-3xl border border-slate-200 p-6 text-center text-sm text-slate-600">
            Cognito login is enabled. Use the button below to continue with the hosted login flow.
          </div>
        )}
      </form>

      <div className="mt-6">
        <p className="text-center text-xs text-slate-500 mb-3">Or continue with</p>
        <div className="grid grid-cols-2 gap-3">
          {['Google', 'GitHub'].map((p) => (
            <button key={p} type="button" className="py-2.5 rounded-xl glass text-sm font-medium hover:glow-hover">
              {p}
            </button>
          ))}
        </div>
        {AUTH_CONFIG.client_id && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => login()}
              className="py-2.5 rounded-xl glass text-sm font-medium hover:glow-hover"
            >
              Sign in with Cognito
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-sm mt-6 text-slate-500">
        No account? <Link to="/register" className="text-indigo-500 font-medium">Register</Link>
      </p>
      <p className="text-center text-xs mt-4 text-slate-400">
        Demo: user@equicart.com / admin@equicart.com — password: demo123
      </p>
    </motion.div>
  );
}
