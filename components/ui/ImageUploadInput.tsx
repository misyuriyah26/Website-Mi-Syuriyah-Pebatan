'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check } from 'lucide-react';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  maxWidth?: number;
}

export const convertFileToBase64 = (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.85
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File yang dipilih bukan gambar!'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => {
        resolve(event.target?.result as string);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = 'Upload Gambar / Foto',
  value,
  onChange,
  placeholder = 'https://... atau pilih file gambar',
  className = '',
  aspectRatio = 'auto',
  maxWidth = 1200,
}) => {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const base64 = await convertFileToBase64(file, maxWidth);
      onChange(base64);
    } catch (err) {
      alert((err as Error).message || 'Gagal memproses gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const base64 = await convertFileToBase64(file, maxWidth);
      onChange(base64);
    } catch (err) {
      alert((err as Error).message || 'Gagal memproses gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const aspectClasses =
    aspectRatio === 'square'
      ? 'aspect-square max-w-[120px]'
      : aspectRatio === 'video'
      ? 'aspect-video max-w-[240px]'
      : aspectRatio === 'banner'
      ? 'aspect-[3/1] max-w-[320px]'
      : 'max-h-36';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="block font-bold text-slate-700 dark:text-slate-300 text-xs">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setIsUrlMode(!isUrlMode)}
            className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            {isUrlMode ? (
              <>
                <Upload className="w-3 h-3" /> Pilih Upload File
              </>
            ) : (
              <>
                <LinkIcon className="w-3 h-3" /> Tempel URL
              </>
            )}
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {isUrlMode ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400"
              title="Hapus Gambar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Drop / Upload Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
                : 'border-slate-300 dark:border-slate-700 hover:border-emerald-600 bg-slate-50 dark:bg-slate-800/60'
            }`}
          >
            {isUploading ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span>Memproses & Kompres Gambar...</span>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mx-auto">
                  <Upload className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Klik atau Tarik File Gambar ke Sini
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Format JPG, PNG, WEBP, GIF (Otomatis Dioptimasi)
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Preview */}
      {Boolean(value && value.trim() !== '') && (
        <div className="relative inline-block mt-2 group border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-900/5 dark:bg-slate-800">
          <img
            src={value}
            alt="Preview"
            className={`object-cover rounded-xl ${aspectClasses}`}
          />
          <div className="absolute top-1 right-1 flex gap-1">
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 rounded-lg bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
              title="Hapus Gambar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-emerald-900/80 text-amber-300 text-[9px] font-bold flex items-center gap-0.5">
            <Check className="w-2.5 h-2.5" /> Tersedia
          </span>
        </div>
      )}
    </div>
  );
};
