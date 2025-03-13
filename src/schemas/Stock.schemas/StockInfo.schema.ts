import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type AccountingFirm {
    nam: Int
    donvikiemtoan: String
  }
  
  type StockInfo {
    _id: ID
    code: String
    accounting_firm: [AccountingFirm]
    address: String
    data_category: String
    description: String
    diff: Float
    diff_percent: Float
    exchange: String
    fetch_time: String
    fetch_url: String
    firm_category: Int
    firm_category_string: String
    fullname_en: String
    fullname_vi: String
    industry_level1: String
    industry_level2: String
    industry_level3: String
    industry_level4: String
    listing_date: String
    market_cap: Float
    note: String
    smg: Float
    total_assets: Float
    total_shares_listed: Int
    total_shares_outstanding: Int
    treasury_stock: Int
    type: String
    volume_15_days_average: Int
    volume_daily: Int
    website: String
  }
  
  type Query {
    # Get all stocks
    allStocks: [StockInfo]
    
    # Get a specific stock by code
    stockByCode(code: String!): StockInfo
    
    # Get stocks by industry
    stocksByIndustry(industry: String!): [StockInfo]
    
    # Get stocks with market cap greater than a value
    stocksByMarketCap(minMarketCap: Float!): [StockInfo]
    
    # Get stocks with accounting firm in a specific year
    stocksByAuditor(auditor: String!, year: Int): [StockInfo]
  }
`;