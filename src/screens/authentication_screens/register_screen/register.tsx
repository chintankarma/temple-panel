import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ApiService from '../../../services/api_service';
import { Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '../../../commons/theme_toggle';
import AppTextField from '../../../commons/ui/app_text_field';
import AppButton from '../../../commons/ui/app_button';
import AlertBanner from '../../../commons/ui/alert_banner';
import { NavRoutes } from '../../../utils/nav_routes';
import { ApiRoutes } from '../../../utils/api_routes';
import { C } from '../../../utils/colors';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact_no: '',
    website: '',
    timings: '',
    address: '',
    city: '',
    district: '',
    state: '',
    country: '',
    pincode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await ApiService.post(ApiRoutes.TEMPLES, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.success) {
        setSuccess('Temple Registration successful! Please log in.');
        setTimeout(() => {
          navigate(NavRoutes.LOGIN);
        }, 2000);
      } else {
        setError(response.message || 'Failed to register');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
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

      <div className="relative z-10 w-full max-w-4xl animate-fade-in px-4 py-8 sm:py-12">
        <div className={`bg-white/80 dark:bg-[#0f1115]/80 backdrop-blur-3xl border ${C.border} ${C.roundedCardLg} shadow-2xl shadow-slate-300/50 dark:shadow-none p-6 sm:p-14 ${C.transition}`}>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <img src="/assets/icons/app_logo_icon.svg" alt="Temple Guide Logo" className="w-16 h-16 object-contain drop-shadow-xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent mb-2">
              Register Your Temple
            </h2>
            <p className={`${C.textSecondary} text-sm`}>Join the platform and manage your temple's legacy</p>
          </div>

          {/* Banners */}
          {error && <div className="mb-6"><AlertBanner message={error} type="error" /></div>}
          {success && <div className="mb-6"><AlertBanner message={success} type="success" /></div>}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppTextField label="Temple Name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Shri Kashi Vishwanath" />
              <AppTextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="temple@example.com" />

              <AppTextField label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} required placeholder="••••••••"
                suffix={
                  <button type="button" className={`${C.textMuted} ${C.brandText} transition-colors focus:outline-none`} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <AppTextField label="Contact Number" name="contact_no" type="text" value={formData.contact_no} onChange={handleChange} placeholder="+91 9876543210" />

              <AppTextField label="Website" name="website" type="text" value={formData.website} onChange={handleChange} placeholder="https://www.example.com" />
              <AppTextField label="Timings" name="timings" type="text" value={formData.timings} onChange={handleChange} placeholder="6:00 AM - 9:00 PM" />
            </div>

            <div className={`border-t ${C.borderDivider} pt-6 mt-6`}>
              <h3 className={`text-lg font-bold mb-4 ${C.textHeading}`}>Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <AppTextField label="Full Address" name="address" type="text" value={formData.address} onChange={handleChange} placeholder="123 Temple Street" />
                </div>
                <AppTextField label="City" name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Varanasi" />
                <AppTextField label="District" name="district" type="text" value={formData.district} onChange={handleChange} placeholder="Varanasi" />
                <AppTextField label="State" name="state" type="text" value={formData.state} onChange={handleChange} placeholder="Uttar Pradesh" />
                <AppTextField label="Country" name="country" type="text" value={formData.country} onChange={handleChange} placeholder="India" />
                <AppTextField label="Pincode" name="pincode" type="text" value={formData.pincode} onChange={handleChange} placeholder="221001" />
              </div>
            </div>

            <div className="pt-4">
              <AppButton type="submit" variant="primary" fullWidth loading={loading} loadingText="Creating Temple Account..." className="text-lg py-4">
                Register Temple
              </AppButton>
            </div>

            <div className="text-center mt-6">
              <p className={`${C.textSecondary} text-sm`}>
                Already have an account?{' '}
                <Link to={NavRoutes.LOGIN} className={`${C.brandText} font-semibold hover:underline`}>
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

