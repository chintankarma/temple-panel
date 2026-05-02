import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/auth_context';
import { NavRoutes } from '../../utils/nav_routes';
import { C } from '../../utils/colors';
import { ASSETS } from '../../utils/assets';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-10 transition-colors duration-300">
      {/* Welcome Banner */}
      <div className={`relative overflow-hidden ${C.roundedCard} ${C.bgCard} border ${C.border} p-6 sm:p-10 ${C.shadowCard} ${C.transition}`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF8044]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FF8044]/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-10">
          <div className="flex-1">
            <h1 className={`text-2xl sm:text-4xl font-bold ${C.textPrimary} mb-4 ${C.transition} tracking-tight`}>
              Welcome back, <span className={`text-transparent bg-clip-text ${C.brandGradient}`}>{user?.name || 'Temple Admin'}</span>!
            </h1>
            <p className={`${C.textSecondary} max-w-2xl text-base sm:text-lg mb-6 sm:mb-8 ${C.transition} leading-relaxed font-light`}>
              Manage your temple details, history, position, and metadata all from this centralized panel. Everything you need is right here.
            </p>
            <button
              className={`group flex items-center gap-3 ${C.brandBg} text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-xl ${C.brandShadow} hover:-translate-y-1`}
              onClick={() => navigate(NavRoutes.TEMPLE_EDIT, { state: { activeTab: 'basic' } })}
            >
              Update Temple Profile
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="hidden lg:block w-56 h-36 rounded-3xl overflow-hidden shadow-2xl -rotate-2 border-8 border-white dark:border-slate-800 flex-shrink-0 transition-all duration-500 hover:rotate-0 hover:scale-110 bg-slate-100 dark:bg-slate-800">
            <img
              src={user?.temple_about?.temple_images_list?.[0] || ASSETS.images.placeholderInfo}
              alt={user?.name || "Temple"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: ASSETS.icons.temple,
            title: 'Basic Details',
            desc: "Update your temple's name, primary timings, contact info, and operational details.",
            color: C.iconOrange,
            tab: 'basic'
          },
          {
            icon: ASSETS.icons.history,
            title: 'History & Lore',
            desc: "Update the rich history, detailed descriptions, and historical significance.",
            color: C.iconIndigo,
            tab: 'history'
          },
          {
            icon: ASSETS.icons.position,
            title: 'Location & Position',
            desc: "Manage address mapping, precise coordinates, and geographic data.",
            color: C.iconEmerald,
            tab: 'position'
          },
          {
            icon: ASSETS.icons.gallery,
            title: 'Temple Gallery',
            desc: "Manage and update your temple's photo albums and gallery collections.",
            color: C.iconRose,
            tab: 'gallery'
          }
        ].map((item, i) => (
          <div
            key={i}
            className={`premium-card group ${C.bgCard} border ${C.border} ${C.roundedCardMd} p-8 hover:border-orange-500/30 ${C.transition} ${C.shadowCardSm} cursor-pointer hover:shadow-2xl hover:-translate-y-2`}
            onClick={() => navigate(NavRoutes.TEMPLE_EDIT, { state: { activeTab: item.tab } })}
          >
            <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform p-4`}>
              <img src={item.icon} alt={item.title} className="w-full h-full object-contain icon-adaptive" />
            </div>
            <h3 className={`text-xl font-bold ${C.textHeading} mb-3 ${C.transition}`}>{item.title}</h3>
            <p className={`${C.textSecondary} leading-relaxed ${C.transition}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Dashboard;

