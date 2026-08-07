'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Link as LinkIcon, X, Check, FileDown, AlertCircle } from 'lucide-react';

interface FileUploadInputProps {
  label?: string;
  fileUrl: string;
  fileSize?: string;
  fileType?: string;
  onFileSelect: (data: {
    fileUrl: string;
    fileSize: string;
    fileType: string;
    fileName?: string;
  }) => void;
  acceptedTypes?: string;
}

export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getFileTypeFromFilename = (filename: string): string => {
  const ext = filename.split('.').pop()?.toUpperCase() || 'FILE';
  if (ext === 'PDF') return 'PDF';
  if (['DOC', 'DOCX'].includes(ext)) return 'DOCX';
  if (['XLS', 'XLSX', 'CSV'].includes(ext)) return 'XLSX';
  if (['PPT', 'PPTX'].includes(ext)) return 'PPTX';
  if (['JPG', 'JPEG', 'PNG', 'WEBP'].includes(ext)) return 'GAMBAR';
  if (ext === 'ZIP' || ext === 'RAR') return 'ZIP';
  return ext;
};

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  label = 'Upload File Dokumen / PDF / Word',
  fileUrl,
  fileSize = '0 KB',
  fileType = 'PDF',
  onFileSelect,
  acceptedTypes = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg',
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(fileUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    // Limit size check (e.g. warn if > 15MB for browser memory)
    if (file.size > 15 * 1024 * 1024) {
      alert('Ukuran file cukup besar (>15MB). Disarankan menggunakan file berukuran lebih kecil atau menyisipkan tautan/URL drive.');
    }

    setIsReading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      const formattedSize = formatBytes(file.size);
      const detectedType = getFileTypeFromFilename(file.name);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

      onFileSelect({
        fileUrl: result,
        fileSize: formattedSize,
        fileType: detectedType,
        fileName: cleanName,
      });

      setCustomUrlInput(result);
      setIsReading(false);
    };

    reader.onerror = () => {
      alert('Gagal membaca file dari perangkat.');
      setIsReading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!customUrlInput.trim()) return;

    let detectedType = 'PDF';
    if (customUrlInput.endsWith('.docx') || customUrlInput.includes('word')) detectedType = 'DOCX';
    else if (customUrlInput.endsWith('.xlsx') || customUrlInput.includes('sheet')) detectedType = 'XLSX';

    onFileSelect({
      fileUrl: customUrlInput.trim(),
      fileSize: fileSize || 'External Link',
      fileType: detectedType,
    });
  };

  const handleClear = () => {
    setCustomUrlInput('');
    onFileSelect({
      fileUrl: '',
      fileSize: '0 KB',
      fileType: 'PDF',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isDataUrl = fileUrl.startsWith('data:');

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{label}</span>
        </label>

        {/* Toggle Mode */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-emerald-800 text-amber-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-emerald-800 text-amber-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Tautan URL</span>
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Mode Upload File */}
      {mode === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 scale-[0.99]'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/50 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/20'
          }`}
        >
          {isReading ? (
            <div className="py-3 flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                Memproses dan mengunggah dokumen...
              </p>
            </div>
          ) : fileUrl ? (
            <div className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-emerald-300 dark:border-emerald-800 shadow-sm text-left">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-700">
                  {fileType}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {isDataUrl ? 'File Lokal Berhasil Diupload' : fileUrl}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Ukuran: {fileSize || 'Termuat'} • Tipe: {fileType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs"
                  title="Pratinjau / Download"
                >
                  <FileDown className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 dark:text-rose-400"
                  title="Ganti File"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-3 space-y-1.5">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-amber-300 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-700">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Klik atau Drag & Drop File di Sini
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Mendukung PDF, Word (DOCX), Excel (XLSX), Gambar, ZIP (Maks. 15MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mode Input Tautan / URL */}
      {mode === 'url' && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tempelkan URL file (https://.../brosur.pdf)"
            value={customUrlInput}
            onChange={(e) => setCustomUrlInput(e.target.value)}
            className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold text-xs shadow flex items-center gap-1 border border-emerald-700 shrink-0"
          >
            <Check className="w-4 h-4" /> Terapkan
          </button>
        </div>
      )}
    </div>
  );
};
