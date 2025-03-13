export interface Stock {
  id: string;
  code: string;
  fullname_vi: string;
  fullname_en?: string;
  exchange: string;
  industry_level1?: string;
  industry_level2?: string;
  market_cap?: number;
  volume?: number;
  pe?: number;
  pb?: number;
  dividend_yield?: number;
  roe?: number;
  roa?: number;
  description?: string;
}

export interface StockFilterInput {
  exchange?: string;
  industry?: string;
  search?: string;
}

export interface StocksResponse {
  totalCount: number;
  stocks: Stock[];
} 