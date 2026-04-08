export interface DaoItem {
  quote: string;
  explanation: string;
  timestamp: string;
  audioClip?: string;
}

export interface FaItem {
  title: string;
  description: string;
  content: string;
  timestamp: string;
}

export interface ShuItem {
  step: number;
  title: string;
  description: string;
  tools: string[];
  timestamp: string;
}

export interface QiItem {
  name: string;
  category: string;
  description: string;
  url?: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  avatar: string;
  audioSrc: string;
  dao: DaoItem[];
  fa: FaItem[];
  shu: ShuItem[];
  qi: QiItem[];
}
