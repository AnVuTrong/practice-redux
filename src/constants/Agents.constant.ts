import { AIAgent } from '../types/chat.types';

export const AI_AGENTS: AIAgent[] = [
  {
    id: 'general',
    name: 'General Assistant',
    description: 'A general-purpose AI assistant',
    avatar: '👤'
  },
  {
    id: 'academic',
    name: 'Academic Advisor',
    description: 'Specialized in academic guidance',
    avatar: '🎓'
  },
  {
    id: 'admin',
    name: 'Administrative Helper',
    description: 'Helps with administrative tasks',
    avatar: '📊'
  }
];
