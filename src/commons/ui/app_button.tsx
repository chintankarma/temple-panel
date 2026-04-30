import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { C } from '../../utils/colors';

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
  primary: `${C.btnPrimary} hover:shadow-orange-500/40 focus:ring-4 focus:ring-orange-500/20`,
  secondary: `${C.btnSecondary} hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md`,
  danger: `${C.btnDanger}`,
  ghost: `${C.btnGhost} hover:text-slate-900 dark:hover:text-slate-100`,
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
