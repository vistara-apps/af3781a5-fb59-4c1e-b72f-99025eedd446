'use client';

import { useState } from 'react';
import { Share2, Link2, MessageCircle, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  variant?: 'social' | 'link';
  title?: string;
  content?: string;
}

export function ShareButton({ 
  variant = 'social', 
  title = "RightRoute - Know Your Rights",
  content = "Essential legal information for law enforcement interactions"
}: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${title}\n\n${content}\n\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: content,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const shareToFarcaster = () => {
    const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`;
    window.open(farcasterUrl, '_blank');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="btn-secondary flex items-center space-x-2"
      >
        <Share2 className="h-5 w-5" />
        <span>Share Rights Card</span>
      </button>

      {showShareMenu && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 bg-opacity-95 backdrop-blur-lg rounded-lg border border-white border-opacity-20 p-4 min-w-64 z-10">
          <h4 className="font-semibold mb-3">Share this card</h4>
          
          <div className="space-y-2">
            <button
              onClick={shareToFarcaster}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <span>Share on Farcaster</span>
            </button>
            
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            >
              <MessageCircle className="h-5 w-5 text-blue-400" />
              <span>Share on Twitter</span>
            </button>
            
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="h-5 w-5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
          
          <button
            onClick={() => setShowShareMenu(false)}
            className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
