import React from 'react';
import { ChatHistory } from '../../types/Chat.types';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  isActive: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ chat, isActive, onClick, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(chat.id);
  };

  return (
    <div
      className={`w-full bg-secondary-light rounded-lg mb-2 overflow-hidden
        ${isActive ? 'bg-secondary' : 'bg-background-secondary'} group cursor-pointer`}
      onClick={() => onClick(chat.id)}>
      <div className='w-full text-left p-5 hover:bg-secondary/50 transition-colors duration-200'>
        <div className='flex justify-between items-start relative'>
          <div className='flex-1 min-w-0'>
            <h1 className='font-bold truncate mr-10'>{chat.title}</h1>
            <p className='text-sm text-text-secondary line-clamp-1 mt-1'>{chat.preview || 'No messages yet'}</p>
          </div>
          <button
            onClick={handleDelete}
            className='absolute right-0 p-2 opacity-0 group-hover:opacity-100 rounded-full bg-background-secondary/75 text-text-secondary hover:bg-accent-error hover:text-white transition-all'
            aria-label='Delete chat'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
