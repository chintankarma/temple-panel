import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/api_service';
import { Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../../../commons/theme_toggle';
import { useAuth } from '../../../context/auth_context';
import AppTextField from '../../../commons/ui/app_text_field';
import AppButton from '../../../commons/ui/app_button';
import AlertBanner from '../../../commons/ui/alert_banner';
import { NavRoutes } from '../../../utils/nav_routes';
import { ApiRoutes } from '../../../utils/api_routes';
import { C } from '../../../utils/colors';
import { ASSETS } from '../../../utils/assets';

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
      const response = await ApiService.post(`${ApiRoutes.AUTH_LOGIN}`, { email, password });

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
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans ${C.textPrimary} transition-colors duration-500 overflow-hidden`}>
      {/* Animated Mesh Background */}
      <div className="mesh-bg"></div>

      {/* Theme Toggle - adjusted for mobile */}
      <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-[10%] left-[5%] w-24 h-24 sm:w-32 sm:h-32 rounded-full ${C.blobTop} blur-2xl animate-bounce`} style={{ animationDuration: '6s' }} />
        <div className={`absolute bottom-[10%] right-[5%] w-32 h-32 sm:w-48 sm:h-48 rounded-full ${C.blobBottom} blur-3xl animate-bounce`} style={{ animationDuration: '8s' }} />
        <div className={`absolute top-[60%] right-[15%] w-16 h-16 sm:w-24 sm:h-24 rounded-full ${C.blobMid} blur-2xl animate-bounce`} style={{ animationDuration: '7s' }} />

        {/* Logo Watermark Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1200px] h-[600px] sm:h-[1200px] opacity-[0.05] dark:opacity-[0.03] rotate-[25deg] transition-all duration-1000">
          <img src={ASSETS.icons.logo} alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg animate-fade-in px-4">
        <div className={`bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-3xl border ${C.border} ${C.roundedCardLg} shadow-2xl shadow-slate-300/50 dark:shadow-none p-6 sm:p-14 ${C.transition}`}>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img src={ASSETS.icons.logo} alt="Temple Guide Logo" className="w-16 h-16 object-contain drop-shadow-xl" />
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
