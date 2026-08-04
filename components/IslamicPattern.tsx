import React from 'react';

export const IslamicPattern: React.FC<{ className?: string }> = ({ className = 'opacity-10' }) => (
  <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] ${className}`} />
);

export const IslamicStarOrnament: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-amber-500' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 4.41L19.5 3.5L18.59 8.41L23 11L19.59 14.59L20.5 19.5L15.59 18.59L13 23L10.41 18.59L5.5 19.5L6.41 14.59L2 12L5.59 8.41L4.7 3.5L9.61 4.41L12 0Z" />
  </svg>
);

export const IslamicDivider: React.FC<{ title?: string; subtitle?: string; light?: boolean }> = ({
  title,
  subtitle,
  light = false,
}) => {
  return (
    <div className="text-center my-6">
      {title && (
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${light ? 'text-white' : 'text-emerald-950'}`}>
          {title}
        </h2>
      )}
      <div className="flex items-center justify-center gap-3 my-2">
        <div className={`h-[1px] w-12 sm:w-20 ${light ? 'bg-amber-400/40' : 'bg-emerald-800/30'}`} />
        <IslamicStarOrnament className={`w-4 h-4 ${light ? 'text-amber-300' : 'text-amber-600'}`} />
        <div className={`h-[1px] w-12 sm:w-20 ${light ? 'bg-amber-400/40' : 'bg-emerald-800/30'}`} />
      </div>
      {subtitle && (
        <p className={`text-sm sm:text-base max-w-2xl mx-auto ${light ? 'text-emerald-100/80' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export const IslamicArchFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative border border-amber-500/30 rounded-2xl p-6 bg-white shadow-sm overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500 rounded-br-xl pointer-events-none" />
      {children}
    </div>
  );
};
