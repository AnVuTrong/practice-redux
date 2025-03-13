import { GraphQLServerManager } from './apollo/GraphqlServer.apollo';

// Create and start the server
const serverManager = new GraphQLServerManager();
serverManager.start().catch(err => {
  console.error('Failed to start GraphQL server:', err);
  process.exit(1);
}); 