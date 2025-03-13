import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { MongoClient } from 'mongodb';
import { typeDefs } from '../schemas/Stock.schemas/StockInfo.schema';
import { resolvers } from '../resolvers/Stock.resolvers/StockInfo.resolver';
import { Application } from 'express';

async function startServer() {
  // Connect to MongoDB
  const uri = "mongodb://promete:promete1secure2password3@localhost:27017/?directConnection=true";
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db("fintech_db");
    const stockCollection = db.collection("stock_info");
    
    // Create Express app
    const app: Application = express();
    
    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { stockCollection }
    });
    
    await server.start();
    server.applyMiddleware({ app: app as any });
    
    // Start the server
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

startServer();