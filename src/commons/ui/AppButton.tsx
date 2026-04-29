import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 ' +
    'text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 ' +
    'focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900',
  secondary:
    'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 ' +
    'hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700',
  danger:
    'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 ' +
    'border border-red-200 dark:border-red-500/30',
  ghost:
    'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 ' +
    'hover:bg-slate-50 dark:hover:bg-slate-800',
};

const AppButton = ({
  variant = 'primary',
  loading = false,
  loadingText,
  icon,
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: AppButtonProps) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium ' +
    'transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ' +
    'disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none';

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${base} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <>
          <Spinner />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default AppButton;
