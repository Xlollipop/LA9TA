import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
