import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
