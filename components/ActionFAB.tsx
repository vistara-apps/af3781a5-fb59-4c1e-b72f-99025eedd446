'use client';

import { ReactNode } from 'react';

interface ActionFABProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function ActionFAB({ 
  variant = 'primary', 
  onClick, 
  children, 
  className = '',
  disabled = false 
}: ActionFABProps) {
  const baseClasses = "fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-50";
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
    secondary: "glass-card hover:bg-opacity-20 text-white"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} ${className}`}
    >
      {children}
    </button>
  );
}
