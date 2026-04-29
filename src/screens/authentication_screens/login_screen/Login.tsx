import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/apiService';
import { Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../../../commons/ThemeToggle';
import { useAuth } from '../../../context/AuthContext';
import AppTextField from '../../../commons/ui/AppTextField';
import AppButton from '../../../commons/ui/AppButton';
import AlertBanner from '../../../commons/ui/AlertBanner';
import { NavRoutes } from '../../../utils/nav_routes';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await ApiService.post('/auth/login', { email, password });

      if (response.success && response.account_type === 'temple') {
        if (response.token?.access_token) {
          login(response.data, response.token.access_token, rememberMe);
        }
        navigate(NavRoutes.DASHBOARD);
      } else if (response.success) {
        setError('Access denied. Temple account required.');
      } else {
        setError(response.message || 'Failed to login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50/30 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/10 dark:bg-orange-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/10 dark:bg-orange-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-white/90 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-orange-900/5 dark:shadow-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-orange-900/10 dark:hover:shadow-orange-900/20">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src="/assets/icons/app_logo_icon.svg" alt="Temple Guide Logo" className="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent mb-2">
              Temple Guide
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Sign in to manage your temple</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6">
              <AlertBanner message={error} type="error" />
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <AppTextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="temple@example.com"
            />

            {/* Password */}
            <AppTextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              suffix={
                <button
                  type="button"
                  className="text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded-md checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer"
                  />
                  <svg
                    className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                  Remember me
                </span>
              </label>

              {/* <button type="button" className="text-sm text-orange-600 dark:text-orange-500 hover:underline font-medium">
                Forgot Password?
              </button> */}
            </div>

            {/* Submit Button */}
            <AppButton
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              loadingText="Signing in..."
              className="mt-8"
            >
              Sign In
            </AppButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
