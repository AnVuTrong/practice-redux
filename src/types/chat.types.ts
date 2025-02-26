export interface AIAgent {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
  agentId?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  agentId?: string;
} 