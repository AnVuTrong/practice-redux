import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { typeDefs } from '../schemas/index';
import { resolvers } from '../resolvers/index';
import { Application } from 'express';
import cors from 'cors';

export class GraphQLServerManager {
  private server: ApolloServer;
  private app: express.Application;
  private port: number;
  private client: MongoClient;

  constructor(port: number = 4000) {
    this.port = port;
    this.app = express();
    this.client = new MongoClient("mongodb://promete:promete1secure2password3@localhost:27017/?directConnection=true");
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
    try {
      console.log("Connecting to MongoDB");
      await this.client.connect();
      console.log("Connected to MongoDB");
      
      const db = this.client.db("fintech_db");
      const stockCollection = db.collection("stock_info");
      
      this.server = new ApolloServer({
        typeDefs,
        resolvers,
        context: { stockCollection }
      });
      
      await this.server.start();
      this.server.applyMiddleware({ app: this.app as any });
      
      this.app.listen(this.port, () => {
        console.log(`🚀 GraphQL server running at http://localhost:${this.port}${this.server.graphqlPath}`);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  
  public async stop(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log("MongoDB connection closed");
    }
    
    if (this.server) {
      await this.server.stop();
      console.log("Apollo server stopped");
    }
  }
}

// Create and start the server when this file is executed directly
if (require.main === module) {
  const serverManager = new GraphQLServerManager();
  serverManager.start().catch(err => {
    console.error('Failed to start GraphQL server:', err);
    process.exit(1);
  });
}