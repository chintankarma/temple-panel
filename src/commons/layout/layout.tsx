import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, PlusCircle, Menu, X as CloseIcon, User } from 'lucide-react';
import ThemeToggle from '../theme_toggle';
import { useState, useEffect } from 'react';
import ConfirmationModal from '../confirmation_modal';
import { useAuth } from '../../context/auth_context';
import { NavRoutes } from '../../utils/nav_routes';
import { C } from '../../utils/colors';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate(NavRoutes.LANDING);
  };

  const navLinkClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-2xl ${C.transition} font-medium
    ${location.pathname === path ? C.navActive : C.navInactive}
  `;

  return (
    <>
      <div className="flex h-screen bg-slate-50 dark:bg-[#0a0c10] text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300 relative">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-72 ${C.bgSidebar} backdrop-blur-xl border-r ${C.borderSubtle} 
          flex flex-col flex-shrink-0 ${C.transition} ${C.shadowSidebar}
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
          <div className="p-6 flex items-center justify-between">
            <Link to={NavRoutes.DASHBOARD} className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
              <img src="/assets/icons/app_logo_icon.svg" alt="Temple Guide Logo" className="w-10 h-10 object-contain" />
              Temple Guide
            </Link>
            <button className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsSidebarOpen(false)}>
              <CloseIcon size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            <Link to={NavRoutes.DASHBOARD} className={navLinkClass(NavRoutes.DASHBOARD)}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to={NavRoutes.TEMPLE_EDIT} className={navLinkClass(NavRoutes.TEMPLE_EDIT)}>
              <PlusCircle size={20} />
              <span>Edit Temple Details</span>
            </Link>
          </nav>

          <div className={`p-4 border-t ${C.borderDivider} ${C.transition}`}>
            <button
              onClick={() => setShowLogoutModal(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 ${C.textSecondary} hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-200 font-medium`}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/5 dark:bg-orange-600/10 blur-[120px] pointer-events-none transition-colors duration-300"></div>

          {/* Topbar */}
          <header className={`h-20 ${C.bgHeader} backdrop-blur-xl border-b ${C.border} flex items-center justify-between px-4 sm:px-8 z-10 sticky top-0 ${C.transition}`}>
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>
              <h1 className={`text-lg sm:text-xl font-bold ${C.textHeading} tracking-tight line-clamp-1`}>
                {location.pathname === NavRoutes.DASHBOARD ? 'Dashboard Overview' : 'Temple Details'}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-5">
              <ThemeToggle />
              <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl ${C.bgCard} border ${C.border} flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md dark:shadow-inner ${C.transition} cursor-pointer group`}>
                <User size={20} className="text-slate-500 dark:text-slate-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar">
            <div className="max-w-6xl mx-auto animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>

      <ConfirmationModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Stay logged in"
        type="warning"
      />
    </>
  );
};

export default Layout;
