export interface PerformanceEvent {
  date: string;
  title: string;
  venue: string;
  details: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export type LanguageCode = "en" | "ko" | "zh";
