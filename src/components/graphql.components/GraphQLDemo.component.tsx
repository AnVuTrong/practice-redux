import React from 'react';
import StockExplorer from '../stock.components/stock_info.components/StockExplorer.component';
import GraphQLPlayground from '../stock.components/stock_info.components/GraphQLPlayground.component';
import LoadingSpinner from '../common/LoadingSpinner.component';
import ExternalPlaygroundInfo from './ExternalPlaygroundInfo.component';
import ServerOfflineMessage from './ServerOfflineMessage.component';

interface GraphQLDemoProps {
  serverStatus: 'checking' | 'online' | 'offline';
}

const GraphQLDemo: React.FC<GraphQLDemoProps> = ({ serverStatus }) => {
  const graphqlServerUrl = "http://localhost:4000/graphql";
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Live GraphQL Demo</h2>
      
      {serverStatus === 'online' ? (
        <>
          <div className="max-h-[500px] overflow-y-auto mb-8">
            <StockExplorer />
          </div>
          
          <div className="max-h-[500px] overflow-y-auto">
            <GraphQLPlayground />
          </div>
          
          <ExternalPlaygroundInfo playgroundUrl={graphqlServerUrl} />
        </>
      ) : serverStatus === 'offline' ? (
        <ServerOfflineMessage serverUrl={graphqlServerUrl} startCommand="yarn server" />
      ) : (
        <div className="flex justify-center items-center p-8">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default GraphQLDemo; 