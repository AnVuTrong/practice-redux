import { ChatHistory } from '../types/chat.types';

export const MOCK_CHAT_HISTORY: ChatHistory[] = [
  {
    id: '1',
    title: 'Course Registration Help',
    preview: 'How do I register for next semester?',
    timestamp: new Date('2024-03-15').toISOString()
  },
  {
    id: '2',
    title: 'Campus Facilities',
    preview: 'Where is the main library located?',
    timestamp: new Date('2024-03-14').toISOString()
  }
];
