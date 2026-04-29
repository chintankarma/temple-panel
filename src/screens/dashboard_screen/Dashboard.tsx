import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NavRoutes } from '../../utils/nav_routes';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 transition-colors duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white dark:from-slate-900 to-orange-50/30 dark:to-slate-800 border border-slate-100 dark:border-slate-700/50 p-8 shadow-xl shadow-orange-900/5 dark:shadow-slate-900/20 transition-all duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2 transition-colors duration-300">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500">{user?.name || 'Temple Admin'}</span>!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg mb-6 transition-colors duration-300">
              Manage your temple details, history, position, and metadata all from this centralized panel.
            </p>
            <button
              className="group flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
              onClick={() => navigate(NavRoutes.TEMPLE_EDIT)}
            >
              Update Temple Profile
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="hidden lg:block w-48 h-32 rounded-2xl overflow-hidden shadow-2xl rotate-2 border-4 border-white dark:border-slate-800 flex-shrink-0 transition-all duration-500 hover:rotate-0 hover:scale-105">
            <img src="/assets/images/info/info_image_1.png" alt="Temple" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-900/5 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-sm dark:shadow-none">
          <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-3">
            <img src="/assets/icons/dashboard/temple_icon.svg" alt="Temple" className="w-full h-full object-contain icon-adaptive" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Basic Details</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">Manage your temple's name, primary timings, contact info, and operational details.</p>
        </div>

        <div className="group bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-900/5 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-sm dark:shadow-none">
          <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-3">
            <img src="/assets/icons/shri_kashi_vishwanath/history_icon.svg" alt="History" className="w-full h-full object-contain icon-adaptive" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">History & Lore</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">Update the rich history, detailed descriptions, and historical significance.</p>
        </div>

        <div className="group bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-900/5 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-sm dark:shadow-none">
          <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden p-3">
            <img src="/assets/icons/shri_kashi_vishwanath/position_icon.svg" alt="Position" className="w-full h-full object-contain icon-adaptive" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Location & Position</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">Manage address mapping, precise coordinates, and geographic data.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
