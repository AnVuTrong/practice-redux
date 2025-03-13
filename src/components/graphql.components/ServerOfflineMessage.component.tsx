import React from 'react';

interface ServerOfflineMessageProps {
  serverUrl: string;
  startCommand: string;
}

const ServerOfflineMessage: React.FC<ServerOfflineMessageProps> = ({ 
  serverUrl,
  startCommand = 'yarn server'
}) => {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded">
      <p>Cannot connect to GraphQL server. Please make sure the server is running at {serverUrl}</p>
      <p className="mt-2">Run the following command in your terminal:</p>
      <pre className="bg-gray-800 text-white p-2 rounded mt-2">{startCommand}</pre>
    </div>
  );
};

export default ServerOfflineMessage; 