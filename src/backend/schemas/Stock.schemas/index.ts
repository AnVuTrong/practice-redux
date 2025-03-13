import { gql } from 'apollo-server-express';

export const stockTypeDefs = gql`
  type Stock {
    id: ID!
    code: String!
    fullname_vi: String!
    fullname_en: String
    exchange: String!
    industry_level1: String
    industry_level2: String
    market_cap: Float
    volume: Float
    pe: Float
    pb: Float
    dividend_yield: Float
    roe: Float
    roa: Float
    description: String
  }
  
  type StocksResponse {
    totalCount: Int!
    stocks: [Stock!]!
  }
  
  input StockFilterInput {
    exchange: String
    industry: String
    search: String
  }
  
  extend type Query {
    stocks(page: Int, limit: Int, filter: StockFilterInput): StocksResponse!
    stockByCode(code: String!): Stock
    stocksByIndustry(industry: String!): [Stock!]!
    exchanges: [String!]!
    industries: [String!]!
  }
`; 