import React from 'react';

interface ExternalPlaygroundInfoProps {
  playgroundUrl: string;
}

const ExternalPlaygroundInfo: React.FC<ExternalPlaygroundInfoProps> = ({ 
  playgroundUrl 
}) => {
  return (
    <div className="mt-8 p-4 bg-blue-100 text-blue-800 rounded">
      <h3 className="font-semibold mb-2">External GraphQL Playground</h3>
      <p>You can also access the GraphQL Playground directly at:</p>
      <a 
        href={playgroundUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {playgroundUrl}
      </a>
    </div>
  );
};

export default ExternalPlaygroundInfo; 