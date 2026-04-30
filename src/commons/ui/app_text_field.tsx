import type { InputHTMLAttributes, ReactNode } from 'react';
import { C } from '../../utils/colors';

interface AppTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  suffix?: ReactNode;
  wrapperClassName?: string;
}

const inputBase =
  `w-full px-4 py-3 ${C.bgInput} ` +
  `border ${C.borderInput} rounded-2xl ` +
  `${C.focusRing} ` +
  `text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ` +
  `${C.transition} outline-none shadow-sm hover:shadow-md`;

const AppTextField = ({
  label,
  error,
  suffix,
  wrapperClassName = '',
  className = '',
  ...props
}: AppTextFieldProps) => {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1 transition-colors duration-300">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          className={`${inputBase} ${suffix ? 'pr-12' : ''} ${className}`}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 ml-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default AppTextField;
