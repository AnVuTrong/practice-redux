import { stockResolvers } from './Stock.resolvers';

// Combine all resolvers
export const resolvers = {
  Query: {
    ...stockResolvers.Query
  },
  Mutation: {
    ...stockResolvers.Mutation
  }
}; 