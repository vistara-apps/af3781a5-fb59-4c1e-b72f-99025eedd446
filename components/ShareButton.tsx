'use client';

import { useState } from 'react';
import { Share2, Link2, MessageCircle, Copy, Check, Loader2, AlertCircle } from 'lucide-react';
import { createFarcasterShareUrl, createTwitterShareUrl, shareContent } from '@/lib/utils';

interface ShareButtonProps {
  variant?: 'social' | 'link';
  title?: string;
  content?: string;
  keyPoints?: string[];
  state?: string;
  language?: string;
}

export function ShareButton({ 
  variant = 'social', 
  title = "RightRoute - Know Your Rights",
  content = "Essential legal information for law enforcement interactions",
  keyPoints = [],
  state = 'General',
  language = 'en'
}: ShareButtonProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [shareableCard, setShareableCard] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCopyLink = async (url?: string) => {
    const linkToCopy = url || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const createShareableCard = async () => {
    setIsCreatingCard(true);
    setError(null);
    
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          keyPoints,
          state,
          language,
          type: 'rights-card'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create shareable card');
      }

      const data = await response.json();
      setShareableCard(data.data);
      return data.data;
    } catch (error) {
      console.error('Error creating shareable card:', error);
      setError(error instanceof Error ? error.message : 'Failed to create shareable card');
      return null;
    } finally {
      setIsCreatingCard(false);
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      try {
        await shareContent({
          title,
          text: content,
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
        setShowShareMenu(true);
      }
    } else {
      setShowShareMenu(true);
    }
  };

  const shareToFarcaster = async () => {
    let card = shareableCard;
    if (!card) {
      card = await createShareableCard();
    }
    
    const shareUrl = card?.shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = `${title}\n\n${content}`;
    
    const farcasterUrl = createFarcasterShareUrl({
      text: shareText,
      url: shareUrl
    });
    
    window.open(farcasterUrl, '_blank');
  };

  const shareToTwitter = async () => {
    let card = shareableCard;
    if (!card) {
      card = await createShareableCard();
    }
    
    const shareUrl = card?.shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    const shareText = `${title}\n\n${content}`;
    
    const twitterUrl = createTwitterShareUrl({
      text: shareText,
      url: shareUrl,
      hashtags: ['RightRoute', 'KnowYourRights', 'LegalRights']
    });
    
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="relative">
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleNativeShare}
        disabled={isCreatingCard}
        className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
      >
        {isCreatingCard ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Creating Card...</span>
          </>
        ) : (
          <>
            <Share2 className="h-5 w-5" />
            <span>Share Rights Card</span>
          </>
        )}
      </button>

      {showShareMenu && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 bg-opacity-95 backdrop-blur-lg rounded-lg border border-white border-opacity-20 p-4 min-w-64 z-10">
          <h4 className="font-semibold mb-3">Share this card</h4>
          
          <div className="space-y-2">
            <button
              onClick={shareToFarcaster}
              disabled={isCreatingCard}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200 disabled:opacity-50"
            >
              {isCreatingCard ? (
                <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
              ) : (
                <MessageCircle className="h-5 w-5 text-purple-400" />
              )}
              <span>Share on Farcaster</span>
            </button>
            
            <button
              onClick={shareToTwitter}
              disabled={isCreatingCard}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200 disabled:opacity-50"
            >
              {isCreatingCard ? (
                <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
              ) : (
                <MessageCircle className="h-5 w-5 text-blue-400" />
              )}
              <span>Share on Twitter</span>
            </button>
            
            <button
              onClick={() => handleCopyLink(shareableCard?.shareUrl)}
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

            {shareableCard && (
              <div className="mt-3 p-3 bg-white bg-opacity-5 rounded-lg">
                <div className="text-xs text-gray-400 mb-2">Shareable Card Created</div>
                <div className="text-sm text-gray-300">
                  {shareableCard.title}
                </div>
                {shareableCard.frameUrl && (
                  <div className="text-xs text-gray-400 mt-1">
                    Farcaster Frame: ✓
                  </div>
                )}
              </div>
            )}
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
