import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, MapPin, Settings, Menu, X as CloseIcon } from 'lucide-react';
import { NavRoutes } from '../../utils/nav_routes';
import ThemeToggle from '../../commons/theme_toggle';
import { useAuth } from '../../context/auth_context';
import { C } from '../../utils/colors';
import { ASSETS } from '../../utils/assets';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const featureObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '-50px' }
    );
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (featureRef.current) featureObserver.observe(featureRef.current);
    if (heroRef.current) heroObserver.observe(heroRef.current);
    
    return () => {
      featureObserver.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <div className={`min-h-screen ${C.bgPage} ${C.textPrimary} font-sans transition-colors duration-500 overflow-x-hidden`}>
      {/* Animated Mesh Background */}
      <div className="mesh-bg"></div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 ${C.bgHeader} backdrop-blur-xl border-b ${C.borderSubtle} ${C.transition}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src={ASSETS.icons.logo} 
              alt="Temple Guide Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md group-hover:rotate-12 transition-transform duration-300" 
            />
            <span className={`text-xl sm:text-2xl font-bold ${C.brandGradient} bg-clip-text text-transparent`}>
              Temple Guide
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            {user ? (
              <button
                onClick={() => navigate(NavRoutes.DASHBOARD)}
                className={`bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:scale-105 active:scale-95`}
              >
                Go to Dashboard
              </button>
            ) : (
              <div className="flex gap-4">
                <Link
                  to={NavRoutes.LOGIN}
                  className={`${C.textSecondary} hover:text-slate-900 dark:hover:text-white font-medium px-4 py-2.5 transition-colors`}
                >
                  Log In
                </Link>
                <Link
                  to={NavRoutes.REGISTER}
                  className={`${C.btnPrimary} px-6 py-2.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-xl`}
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${C.bgInput} border ${C.border}`}
            >
              {isMobileMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0a0c10] border-b ${C.border} transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] py-10 shadow-2xl' : 'max-h-0'}`}>
          <div className="flex flex-col px-6 gap-8">
            {user ? (
              <button
                onClick={() => {
                  navigate(NavRoutes.DASHBOARD);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all`}
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to={NavRoutes.LOGIN}
                  className={`${C.textSecondary} text-center font-bold text-xl py-2`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to={NavRoutes.REGISTER}
                  className={`${C.btnPrimary} w-full py-5 rounded-2xl font-bold text-center text-xl shadow-lg active:scale-95 transition-all`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className={`max-w-7xl mx-auto relative z-10 text-center transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full ${C.brandBgSubtle} border ${C.brandBorder} ${C.brandText} text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-sm`}>
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-orange-500"></span>
            </span>
            The Ultimate Temple Management Platform
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 leading-tight transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            Manage your Temple <br className="hidden md:block" />
            with <span className={`text-transparent bg-clip-text ${C.brandGradient}`}>Modern Elegance</span>
          </h1>

          <p className={`text-base sm:text-lg md:text-xl ${C.textSecondary} max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            A comprehensive, digital-first dashboard designed specifically for temple administrators. Easily update history, manage locations, and share your temple's legacy with the world.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Link
              to={user ? NavRoutes.DASHBOARD : NavRoutes.REGISTER}
              className={`w-full sm:w-auto ${C.brandBg} text-white px-8 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 flex items-center justify-center gap-2 group`}
            >
              Get Started Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={NavRoutes.LOGIN}
              className={`w-full sm:w-auto ${C.btnSecondary} px-8 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md flex items-center justify-center`}
            >
              Log In to Panel
            </Link>
          </div>
        </div>

        {/* Floating animated blobs - Adjusted for mobile */}
        <div className="absolute top-[15%] left-[-10%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-orange-400/10 blur-[60px] sm:blur-[100px] animate-float"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-72 h-72 sm:w-[30rem] sm:h-[30rem] rounded-full bg-orange-600/10 blur-[80px] sm:blur-[120px] animate-float" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
      </section>

      {/* Features Section */}
      <section ref={featureRef} className={`py-16 sm:py-24 px-4 sm:px-6 ${C.bgMuted} border-y ${C.border} relative z-10 overflow-hidden`}>
        {/* Subtle Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FF8044 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Everything you need to manage your Temple</h2>
            <p className={`${C.textSecondary} max-w-2xl mx-auto text-base sm:text-lg`}>
              Our intuitive dashboard puts all the powerful tools you need right at your fingertips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className={`premium-card ${C.bgCard} p-6 sm:p-8 ${C.roundedCardMd} border ${C.border} ${C.shadowCardSm} transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${C.iconOrange} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 animate-pulse-soft`}>
                <Settings size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">Basic Information</h3>
              <p className={`${C.textSecondary} text-sm sm:text-base leading-relaxed`}>Easily update your temple's name, primary timings, contact information, and operational details instantly.</p>
            </div>

            <div className={`premium-card ${C.bgCard} p-6 sm:p-8 ${C.roundedCardMd} border ${C.border} ${C.shadowCardSm} transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${C.iconIndigo} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 animate-pulse-soft`} style={{ animationDelay: '1s' }}>
                <BookOpen size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">Rich History & Lore</h3>
              <p className={`${C.textSecondary} text-sm sm:text-base leading-relaxed`}>Document and share the deep historical significance, myths, and detailed descriptions of your temple's legacy.</p>
            </div>

            <div className={`premium-card ${C.bgCard} p-6 sm:p-8 ${C.roundedCardMd} border ${C.border} ${C.shadowCardSm} transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${C.iconEmerald} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 animate-pulse-soft`} style={{ animationDelay: '2s' }}>
                <MapPin size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3">Precise Location</h3>
              <p className={`${C.textSecondary} text-sm sm:text-base leading-relaxed`}>Manage address mapping, precise geographic coordinates, and help devotees find their way seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 text-center ${C.textSecondary} border-t ${C.border} relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-6`}>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8">
          <Link to="#" className="hover:text-primary transition-colors text-base font-semibold">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary transition-colors text-base font-semibold">Terms of Service</Link>
          <Link to="#" className="hover:text-primary transition-colors text-base font-semibold">Contact Support</Link>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Temple Guide. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;

