import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validateRegister } from '../utils/validators';
import { Loader } from '../components/ui/Loader';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await register(form);
      toast('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast(err.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, icon: Icon, type, field }) => (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input type={type} value={form[field]} onChange={update(field)} className="w-full pl-10 pr-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50" />
      </div>
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-2xl">
      <h1 className="font-heading text-2xl font-bold text-center">Create account</h1>
      <p className="text-center text-slate-500 text-sm mt-1 mb-6">Join EquiCart enterprise commerce</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full name" icon={User} type="text" field="name" />
        <Field label="Email" icon={Mail} type="email" field="email" />
        <div>
          <label className="text-sm font-medium mb-1 block">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type={showPass ? 'text' : 'password'} value={form.password} onChange={update('password')} className="w-full pl-10 pr-12 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Confirm password</label>
          <input type="password" value={form.confirmPassword} onChange={update('confirmPassword')} className="w-full px-4 py-3 rounded-xl glass outline-none focus:ring-2 focus:ring-indigo-500/50" />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <button type="submit" disabled={loading} className="w-full py-3 rounded-xl btn-gradient flex items-center justify-center gap-2">
          {loading ? <Loader /> : 'Create account'}
        </button>
      </form>
      <p className="text-center text-sm mt-6 text-slate-500">
        Have an account? <Link to="/login" className="text-indigo-500 font-medium">Sign in</Link>
      </p>
    </motion.div>
  );
}
