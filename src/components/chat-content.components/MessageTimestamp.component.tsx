import React from 'react';

interface MessageTimestampProps {
  timestamp: number | string;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({ timestamp }) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);

  return <span className='text-xs opacity-70 mt-1 block'>{date.toLocaleTimeString()}</span>;
};
