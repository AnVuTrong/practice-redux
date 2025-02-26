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