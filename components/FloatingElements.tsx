'use client';

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Stars */}
      <div className="floating-element top-20 left-10 text-yellow-300 opacity-60">
        ✨
      </div>
      <div className="floating-element top-32 right-20 text-blue-300 opacity-40">
        ⭐
      </div>
      <div className="floating-element top-64 left-1/4 text-purple-300 opacity-50">
        ✦
      </div>
      <div className="floating-element bottom-32 right-10 text-pink-300 opacity-60">
        ✨
      </div>
      <div className="floating-element bottom-48 left-16 text-cyan-300 opacity-40">
        ⭐
      </div>
      
      {/* Floating Geometric Shapes */}
      <div className="floating-element top-40 right-1/3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg opacity-20 animate-pulse-slow" />
      </div>
      <div className="floating-element bottom-40 left-1/3">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse-slow" />
      </div>
      <div className="floating-element top-1/2 left-8">
        <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-400 transform rotate-45 opacity-25 animate-pulse-slow" />
      </div>
    </div>
  );
}
