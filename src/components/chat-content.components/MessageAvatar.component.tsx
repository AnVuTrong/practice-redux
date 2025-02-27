import React from 'react';
import { Link } from 'react-router-dom';

interface MessageAvatarProps {
  initial: string;
  name: string;
  isBot?: boolean;
  linkToSettings?: boolean;
}

export const MessageAvatar: React.FC<MessageAvatarProps> = ({ initial, name, isBot = false, linkToSettings = false }) => {
  const AvatarContent = () => (
    <div className='flex items-center mb-2'>
      <div className='w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-2'>
        <span className='text-xs text-bold text-white'>{initial}</span>
      </div>
      <span className={`${isBot ? 'text-xs' : 'text-sm'} font-bold ${isBot ? 'mb-1' : ''}`}>{name}</span>
    </div>
  );

  if (linkToSettings) {
    return (
      <Link to='/settings' className='flex items-center hover:opacity-80 transition-opacity'>
        <AvatarContent />
      </Link>
    );
  }

  return <AvatarContent />;
};
