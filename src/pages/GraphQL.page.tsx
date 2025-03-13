import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import StockExplorer from '../components/stock.components/stock_info.components/StockExplorer.component';
import GraphQLPlayground from '../components/stock.components/stock_info.components/GraphQLPlayground.component';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: ReactNode, fallback: ReactNode },
  { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {this.props.fallback}
          <details className="mt-4 p-2 border rounded">
            <summary className="font-semibold">Error Details</summary>
            <pre className="mt-2 p-2 bg-red-50 text-red-800 rounded overflow-auto">
              {this.state.error?.toString()}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Create Apollo Client with better error handling
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // Don't use cache for this demo
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

const GraphQL = () => {
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check if the server is running
  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `{ __typename }`
          })
        });
        
        if (response.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (error) {
        setServerStatus('offline');
      }
    };
    
    checkServer();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto p-6 max-h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">GraphQL Learning</h1>
        
        {/* Server Status Indicator */}
        <div className={`mb-4 p-2 rounded ${
          serverStatus === 'online' ? 'bg-green-100 text-green-800' : 
          serverStatus === 'offline' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          <p className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              serverStatus === 'online' ? 'bg-green-500' : 
              serverStatus === 'offline' ? 'bg-red-500' : 
              'bg-yellow-500'
            }`}></span>
            GraphQL Server Status: {
              serverStatus === 'online' ? 'Online' : 
              serverStatus === 'offline' ? 'Offline - Please start the server' : 
              'Checking...'
            }
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Getting Started with GraphQL</h2>
          
          <p className="mb-4">
            This page demonstrates how GraphQL works with real data from your MongoDB database.
          </p>
          
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-2">What is GraphQL?</h3>
            <p>
              GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. 
              It provides a complete and understandable description of the data in your API and gives clients the power 
              to ask for exactly what they need.
            </p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium mb-2">Key Concepts</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Schema Definition Language (SDL)</li>
              <li>Queries and Mutations</li>
              <li>Resolvers</li>
              <li>Type System</li>
              <li>Fragments</li>
            </ul>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">GraphQL vs Redux</h3>
            <p className="mb-2">
              GraphQL can replace Redux in many React applications by:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Managing client-side state with Apollo Client's cache</li>
              <li>Eliminating the need for action creators and reducers for data fetching</li>
              <li>Providing a declarative way to specify data requirements</li>
              <li>Reducing boilerplate code significantly</li>
              <li>Offering optimized network requests by fetching only needed data</li>
            </ul>
          </div>
        </div>
        
        {/* GraphQL Demo with Stock Data */}
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
      </div>
    </ApolloProvider>
  );
};

export default GraphQL;