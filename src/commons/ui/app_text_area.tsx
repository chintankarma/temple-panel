import type { TextareaHTMLAttributes } from 'react';
import { C } from '../../utils/colors';

interface AppTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const textAreaBase =
  `w-full px-4 py-3 ${C.bgInput} ` +
  `border ${C.borderInput} rounded-2xl ` +
  `${C.focusRing} ` +
  `text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ` +
  `${C.transition} outline-none shadow-sm hover:shadow-md resize-y`;


const AppTextArea = ({
  label,
  error,
  wrapperClassName = '',
  className = '',
  ...props
}: AppTextAreaProps) => {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1 transition-colors duration-300">
          {label}
        </label>
      )}
      <textarea {...props} className={`${textAreaBase} ${className}`} />
      {error && (
        <p className="mt-1.5 ml-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default AppTextArea;
