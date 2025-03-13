import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { typeDefs } from '../schemas/index';
import { resolvers } from '../resolvers/index';
import cors from 'cors';

// Create a class for the GraphQL server following OOP principles
export class GraphQLServerManager {
  private server: ApolloServer;
  private app: express.Application;
  private port: number;

  constructor(port: number = 4000) {
    this.port = port;
    this.app = express();
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    this.setupMiddleware();
  }

  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public async start(): Promise<void> {
    await this.server.start();
    this.server.applyMiddleware({ app: this.app as any });
    
    this.app.listen(this.port, () => {
      console.log(`🚀 GraphQL server running at http://localhost:${this.port}${this.server.graphqlPath}`);
    });
  }
}

// Create and start the server when this file is executed directly
if (require.main === module) {
  const serverManager = new GraphQLServerManager();
  serverManager.start().catch(err => {
    console.error('Failed to start GraphQL server:', err);
  });
} 