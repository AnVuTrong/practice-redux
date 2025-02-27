import React, { useState } from 'react';
import { Message } from '../../types/chat.types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(message.content)
      .then(() => {
        // Could add a toast notification here
        console.log('Content copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 relative
        ${isBot ? 'bg-secondary text-text-primary' : 'bg-primary text-white'}`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
        
        {isBot && (
          <div className="absolute bottom-1 right-1 flex space-x-1">
            {/* Copy Content Button */}
            <div className="relative">
              <button 
                className="p-1.5 rounded-md bg-secondary hover:bg-secondary-dark hover:text-primary transition-colors"
                onClick={handleCopyContent}
                onMouseEnter={() => setShowTooltip('copy')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                </svg>
                {showTooltip === 'copy' && (
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-text-primary text-white rounded shadow-lg whitespace-nowrap">
                    Sao chép nội dung
                  </div>
                )}
              </button>
            </div>
            
            {/* Edit Response Button */}
            <div className="relative">
              <button 
                className="p-1.5 rounded-md bg-secondary hover:bg-secondary-dark hover:text-primary transition-colors"
                onMouseEnter={() => setShowTooltip('edit')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                {showTooltip === 'edit' && (
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-text-primary text-white rounded shadow-lg whitespace-nowrap">
                    Chỉnh sửa câu trả lời
                  </div>
                )}
              </button>
            </div>
            
            {/* View References Button */}
            <div className="relative">
              <button 
                className="p-1.5 rounded-md bg-secondary hover:bg-secondary-dark hover:text-primary transition-colors"
                onMouseEnter={() => setShowTooltip('references')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                {showTooltip === 'references' && (
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-text-primary text-white rounded shadow-lg whitespace-nowrap">
                    Xem tài liệu tham khảo
                  </div>
                )}
              </button>
            </div>
            
            {/* Rate Response Button */}
            <div className="relative">
              <button 
                className="p-1.5 rounded-md bg-secondary hover:bg-secondary-dark hover:text-primary transition-colors"
                onMouseEnter={() => setShowTooltip('rate')}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
                {showTooltip === 'rate' && (
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-text-primary text-white rounded shadow-lg whitespace-nowrap">
                    Đánh giá câu trả lời
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 