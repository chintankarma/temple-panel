import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, UploadCloud } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

interface AppImageUploadProps {
  label: string;
  name: string;
  multiple?: boolean;
  value: (File | string)[]; // Can be File objects (new) or strings (existing URLs)
  onChange: (files: (File | string)[]) => void;
}

const AppImageUpload: React.FC<AppImageUploadProps> = ({ label, multiple = false, value = [], onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<{ url: string; file: File | string; id: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate previews for the provided value
    const safeValue = Array.isArray(value) ? value : [];
    const newPreviews = safeValue.map((item, index) => {
      if (typeof item === 'string') {
        if (item.trim() === '') return null;
        return { url: item, file: item, id: `existing-${item}-${index}` }; // existing URL
      } else if (item instanceof File) {
        return { url: URL.createObjectURL(item), file: item, id: `new-${item.name}-${index}` }; // new File
      }
      return null;
    }).filter(Boolean) as { url: string; file: File | string; id: string }[] ;
    
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(value);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange(items);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>

      <div
        className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] cursor-pointer
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {previews.map((preview, index) => (
                  <Draggable key={preview.id} draggableId={preview.id} index={index}>
                    {(provided, snapshot) => {
                      const content = (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative group/image rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 aspect-video bg-slate-50 dark:bg-slate-900 flex items-center justify-center shadow-sm
                            ${snapshot.isDragging ? 'shadow-2xl scale-105 z-50 ring-2 ring-orange-500' : 'hover:shadow-md transition-all duration-300'}`}
                          style={{
                            ...provided.draggableProps.style,
                            // If dragging, fix the width/height to match the original size
                            ...(snapshot.isDragging ? { width: '200px', height: '112.5px' } : {})
                          }}
                        >
                          <img
                            src={preview.url}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://placehold.co/400x225/png?text=Image+Not+Found';
                            }}
                          />

                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[2px]">
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
                      );

                      if (snapshot.isDragging) {
                        return createPortal(content, document.body);
                      }
                      return content;
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default AppImageUpload;
