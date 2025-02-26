export interface AIAgent {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
  agentId?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  agentId?: string;
} 