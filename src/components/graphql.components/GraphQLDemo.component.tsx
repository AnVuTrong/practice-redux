import React from 'react';
import StockExplorer from '../stock.components/stock_info.components/StockExplorer.component';
import GraphQLPlayground from '../stock.components/stock_info.components/GraphQLPlayground.component';

interface GraphQLDemoProps {
  serverStatus: 'checking' | 'online' | 'offline';
}

const GraphQLDemo: React.FC<GraphQLDemoProps> = ({ serverStatus }) => {
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
          
          <div className="mt-8 p-4 bg-blue-100 text-blue-800 rounded">
            <h3 className="font-semibold mb-2">External GraphQL Playground</h3>
            <p>You can also access the GraphQL Playground directly at:</p>
            <a 
              href="http://localhost:4000/graphql" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              http://localhost:4000/graphql
            </a>
          </div>
        </>
      ) : serverStatus === 'offline' ? (
        <div className="bg-red-100 text-red-800 p-4 rounded">
          <p>Cannot connect to GraphQL server. Please make sure the server is running at http://localhost:4000/graphql</p>
          <p className="mt-2">Run the following command in your terminal:</p>
          <pre className="bg-gray-800 text-white p-2 rounded mt-2">yarn server</pre>
        </div>
      ) : (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default GraphQLDemo; 