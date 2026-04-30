import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud } from 'lucide-react';

interface AppImageUploadProps {
  label: string;
  name: string;
  multiple?: boolean;
  value: (File | string)[]; // Can be File objects (new) or strings (existing URLs)
  onChange: (files: (File | string)[]) => void;
}

const AppImageUpload: React.FC<AppImageUploadProps> = ({ label, multiple = false, value = [], onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<{ url: string; file: File | string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate previews for the provided value
    const newPreviews = value.map(item => {
      if (typeof item === 'string') {
        return { url: item, file: item }; // existing URL
      } else {
        return { url: URL.createObjectURL(item), file: item }; // new File
      }
    });
    setPreviews(newPreviews);

    // Cleanup object URLs
    return () => {
      newPreviews.forEach(preview => {
        if (typeof preview.file !== 'string') {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [value]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    let updatedFiles = [...value];
    if (multiple) {
      updatedFiles = [...updatedFiles, ...newFiles];
    } else {
      updatedFiles = [newFiles[0]];
    }
    onChange(updatedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = value.filter((_, index) => index !== indexToRemove);
    onChange(updatedFiles);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all duration-300 flex flex-col items-center justify-center min-h-[180px]
          ${isDragging
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
            : 'border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/50'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="flex flex-col items-center text-slate-500 dark:text-slate-400 pointer-events-none">
          <UploadCloud className="w-10 h-10 mb-3 text-slate-400 dark:text-slate-500" />
          <p className="text-sm font-medium mb-1">
            <span className="text-orange-500">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 aspect-video bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-sm">
              <img
                src={preview.url}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/png?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppImageUpload;
