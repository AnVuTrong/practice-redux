import { gql } from 'apollo-server-express';
import { stockTypeDefs } from './Stock.schemas';

// Base type definitions
const baseTypeDefs = gql`
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
  }
`;

// Combine all type definitions
export const typeDefs = [baseTypeDefs, stockTypeDefs]; 