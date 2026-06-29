export type Platform = '1xbet' | 'melbet';

export type GameId = 'aviator' | 'apple_of_fortune';

export interface GameInfo {
  id: GameId;
  title: string;
  arabicTitle: string;
  icon: string;
  description: string;
  arabicDescription: string;
}

export interface PredictionResult {
  multiplier?: number;
  mines?: number[][]; // 5x5 grid of safe paths
  applePath?: number[]; // indices of safe columns for each row
  winChance: number;
  generatedAt: string;
  extraTip: string;
}

export interface MarvUserState {
  accountId: string;
  promoCode: string;
  selectedPlatform: Platform;
  isSubscribedTelegram: boolean;
  isSubscribedYoutube: boolean;
  isLoggedIn: boolean;
}

export interface LiveFeedMessage {
  id: string;
  gameId: GameId;
  platform: Platform;
  message: string;
  timestamp: string;
  badge?: string;
}
