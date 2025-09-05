import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(successful);
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.resolve(false);
    }
  }
}

export function getLocationFromBrowser(): Promise<{ state: string; country: string } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // In a real app, you'd use a geocoding service
          // For demo purposes, return a default location
          resolve({ state: 'California', country: 'US' });
        } catch (error) {
          console.error('Geocoding error:', error);
          resolve(null);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        resolve(null);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
}

export function shareContent(data: {
  title: string;
  text: string;
  url?: string;
}): Promise<boolean> {
  if (navigator.share) {
    return navigator.share(data).then(() => true).catch(() => false);
  } else {
    // Fallback: copy to clipboard
    const shareText = `${data.title}\n\n${data.text}${data.url ? `\n\n${data.url}` : ''}`;
    return copyToClipboard(shareText);
  }
}

export function isValidState(state: string): boolean {
  const validStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  
  return validStates.includes(state);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isMediaRecordingSupported(): boolean {
  return typeof MediaRecorder !== 'undefined' && 
         typeof navigator.mediaDevices !== 'undefined' &&
         typeof navigator.mediaDevices.getUserMedia !== 'undefined';
}

export function createFarcasterShareUrl(data: {
  text: string;
  url?: string;
}): string {
  const baseUrl = 'https://warpcast.com/~/compose';
  const params = new URLSearchParams();
  
  if (data.text) {
    params.append('text', data.text);
  }
  
  if (data.url) {
    params.append('embeds[]', data.url);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

export function createTwitterShareUrl(data: {
  text: string;
  url?: string;
  hashtags?: string[];
}): string {
  const baseUrl = 'https://twitter.com/intent/tweet';
  const params = new URLSearchParams();
  
  if (data.text) {
    params.append('text', data.text);
  }
  
  if (data.url) {
    params.append('url', data.url);
  }
  
  if (data.hashtags && data.hashtags.length > 0) {
    params.append('hashtags', data.hashtags.join(','));
  }
  
  return `${baseUrl}?${params.toString()}`;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const attempt = async () => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        attempts++;
        
        if (attempts >= maxAttempts) {
          reject(error);
        } else {
          setTimeout(attempt, delay * attempts);
        }
      }
    };
    
    attempt();
  });
}
