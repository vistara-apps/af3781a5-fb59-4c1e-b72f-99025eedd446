'use client';

import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface InfoCardProps {
  title: string;
  content: string;
  keyPoints?: string[];
  variant?: 'bordered' | 'highlighted';
  onClick?: () => void;
  children?: ReactNode;
}

export function InfoCard({ 
  title, 
  content, 
  keyPoints = [], 
  variant = 'bordered',
  onClick,
  children 
}: InfoCardProps) {
  const baseClasses = "p-6 rounded-lg transition-all duration-200 cursor-pointer";
  const variantClasses = {
    bordered: "glass-card hover:bg-opacity-15",
    highlighted: "bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 border border-purple-300 hover:bg-opacity-30"
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-200 mb-4">{content}</p>
          
          {keyPoints.length > 0 && (
            <ul className="space-y-1">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                  {point}
                </li>
              ))}
            </ul>
          )}
          
          {children}
        </div>
        
        {onClick && (
          <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
        )}
      </div>
    </div>
  );
}
