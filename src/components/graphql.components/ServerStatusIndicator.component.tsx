import React from 'react';

interface ServerStatusIndicatorProps {
  status: 'checking' | 'online' | 'offline';
}

const ServerStatusIndicator: React.FC<ServerStatusIndicatorProps> = ({ status }) => {
  return (
    <div className={`mb-4 p-2 rounded ${
      status === 'online' ? 'bg-green-100 text-green-800' : 
      status === 'offline' ? 'bg-red-100 text-red-800' : 
      'bg-yellow-100 text-yellow-800'
    }`}>
      <p className="flex items-center">
        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
          status === 'online' ? 'bg-green-500' : 
          status === 'offline' ? 'bg-red-500' : 
          'bg-yellow-500'
        }`}></span>
        GraphQL Server Status: {
          status === 'online' ? 'Online' : 
          status === 'offline' ? 'Offline - Please start the server' : 
          'Checking...'
        }
      </p>
    </div>
  );
};

export default ServerStatusIndicator; 