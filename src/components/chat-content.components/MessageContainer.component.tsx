import React, { ReactNode } from 'react';

interface MessageContainerProps {
  isBot: boolean;
  children: ReactNode;
}

export const MessageContainer: React.FC<MessageContainerProps> = ({ isBot, children }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-4 relative
        ${isBot ? 'bg-secondary text-text-primary' : 'bg-emerald-100'}`}>
        {children}
      </div>
    </div>
  );
};
