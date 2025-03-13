import React, { useState, useEffect } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ServerStatusIndicator from '../components/graphql.components/ServerStatusIndicator.component';
import GraphQLDemo from '../components/graphql.components/GraphQLDemo.component';

// Create Apollo Client with caching enabled
// Apollo Client fetch policies:
// - cache-first: (Default) Check the cache first. If the data exists, use it. If not, fetch from the network.
// - cache-only: Only check the cache. If the data doesn't exist, the query will fail.
// - network-only: Always fetch from the network, ignore the cache.
// - cache-and-network: Check the cache first and return that data, then also fetch from the network to update the cache.
// - no-cache: Similar to network-only but doesn't store the result in the cache.
// - standby: This query is not actively watching, but can be refetched as needed.

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // Use cache but also update from network
      errorPolicy: 'all'
    },
    query: {
      fetchPolicy: 'cache-first', // Check cache first, only fetch from network if needed
      errorPolicy: 'all'
    }
  }
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
      <div className='container mx-auto p-6 max-h-screen overflow-y-auto'>
        <h1 className='text-3xl font-bold mb-6'>GraphQL Learning</h1>

        {/* Server Status Indicator */}
        <ServerStatusIndicator status={serverStatus} />

        {/* GraphQL Demo */}
        <GraphQLDemo serverStatus={serverStatus} />
      </div>
    </ApolloProvider>
  );
};

export default GraphQL;
