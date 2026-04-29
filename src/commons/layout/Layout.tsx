import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';

import { useAuth } from '../../context/AuthContext';
import { NavRoutes } from '../../utils/nav_routes';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = (path: string) => `
    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
    ${location.pathname === path
      ? 'bg-gradient-to-r from-orange-500/10 dark:from-orange-500/20 to-orange-500/5 text-orange-600 dark:text-orange-500 border border-orange-500/20 shadow-sm'
      : 'text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-slate-100 hover:bg-orange-50/50 dark:hover:bg-slate-800/50'}
  `;

  return (
    <>
      <div className="flex h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-300">
        {/* Sidebar */}
        <aside className="w-72 bg-white/90 backdrop-blur-xl dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col z-20 flex-shrink-0 transition-colors duration-300">
          <div className="p-6">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
              <img src="/assets/icons/app_logo_icon.svg" alt="Temple Guide Logo" className="w-10 h-10 object-contain" />
              Temple Guide
            </Link>
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

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-200 font-medium"
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
          <header className="h-20 bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between px-8 z-10 sticky top-0 transition-colors duration-300">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {location.pathname === '/' ? 'Dashboard Overview' : 'Temple Details'}
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-slate-800 border border-orange-100/50 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm dark:shadow-inner transition-colors duration-300 text-slate-600 dark:text-slate-300">
                <img src="/assets/icons/profile_icon.svg" alt="User" className="w-6 h-6 object-contain icon-adaptive" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
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
