'use client';

import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface MobileNavBarProps {
  variant?: 'default';
}

export function MobileNavBar({ variant = 'default' }: MobileNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-card mx-4 mt-4 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold">RightRoute</span>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="mt-4 space-y-2">
          <a href="#guides" className="block py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
            Rights Cards
          </a>
          <a href="#scripts" className="block py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
            Scripts
          </a>
          <a href="#record" className="block py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
            Record
          </a>
          <a href="#share" className="block py-2 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
            Share
          </a>
        </div>
      )}
    </nav>
  );
}
