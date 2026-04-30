import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../utils/use_theme';
import { C } from '../utils/colors';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        relative w-20 h-10 rounded-full p-1.5 
        ${C.bgInput} border ${C.border} 
        ${C.transition} shadow-inner cursor-pointer
        group focus:outline-none
      `}
      aria-label="Toggle theme"
    >
      {/* Track Background Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-2.5 pointer-events-none">
        <Sun 
          size={16} 
          className={`${isDark ? 'text-slate-500 opacity-40' : 'text-orange-500 opacity-0'} ${C.transition}`} 
        />
        <Moon 
          size={16} 
          className={`${isDark ? 'text-orange-400 opacity-0' : 'text-slate-400 opacity-40'} ${C.transition}`} 
        />
      </div>

      {/* Sliding Thumb */}
      <div
        className={`
          relative z-10 w-7 h-7 rounded-full 
          flex items-center justify-center
          ${isDark ? 'translate-x-10 bg-slate-800' : 'translate-x-0 bg-white'}
          shadow-lg transition-all duration-500
          group-hover:scale-110 active:scale-95
        `}
        style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)' }}
      >
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'}`}>
          <Sun size={16} className="text-orange-500 fill-orange-500/10" />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`}>
          <Moon size={16} className="text-orange-400 fill-orange-400/10" />
        </div>
      </div>

      {/* Subtle Glow Effect */}
      <div 
        className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 ${C.transition}
          ${isDark ? 'shadow-[0_0_15px_rgba(251,146,60,0.1)]' : 'shadow-[0_0_15px_rgba(249,115,22,0.1)]'}
        `}
      />
    </button>
  );
};

export default ThemeToggle;
