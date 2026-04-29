import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../utils/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg border border-slate-300 dark:border-slate-700 shadow-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-md transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
        title="Light Mode"
      >
        <Sun size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-md transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
        title="System Default"
      >
        <Monitor size={16} />
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-md transition-all ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm text-orange-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
        title="Dark Mode"
      >
        <Moon size={16} />
      </button>
    </div>
  );
};

export default ThemeToggle;
