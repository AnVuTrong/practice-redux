import { gql } from 'apollo-server-express';

export const stockTypeDefs = gql`
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
    total_shares_listed: Float
    total_shares_outstanding: Float
    treasury_stock: Float
    type: String
    volume_15_days_average: Float
    volume_daily: Float
    website: String
  }
  
  # Add this new type for the paginated stocks response
  type StocksResponse {
    totalCount: Int!
    stocks: [StockInfo]!
  }
  
  # Add this input type for filtering stocks
  input StockFilterInput {
    exchange: String
    industry: String
    search: String
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
    
    # Add the new paginated and filtered stocks query
    stocks(page: Int!, limit: Int!, filter: StockFilterInput): StocksResponse!
    
    # Add filters for the explorer
    allExchanges: [String!]!
    allIndustries: [String!]!
  }
`;