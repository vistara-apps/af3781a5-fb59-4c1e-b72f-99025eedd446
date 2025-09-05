export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  preferences: UserPreferences;
  premiumContent: boolean;
}

export interface UserPreferences {
  language: 'en' | 'es';
  state: string;
  notifications: boolean;
}

export interface Guide {
  guideId: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  state: string;
  contentType: 'rights-card' | 'script' | 'general';
}

export interface Recording {
  recordingId: string;
  userId: string;
  timestamp: Date;
  filePath: string;
  storageType: 'local' | 'ipfs' | 'arweave';
}

export interface ScriptRequest {
  scenario: string;
  state: string;
  language: 'en' | 'es';
}

export interface GeneratedScript {
  whatToSay: string[];
  whatNotToSay: string[];
  keyRights: string[];
  additionalTips: string[];
}
