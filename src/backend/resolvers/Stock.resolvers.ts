import { Stock, StockFilterInput, StocksResponse } from '../types/Stock.types';
import { StockService } from '../services/Stock.service';

// Create a service instance
const stockService = new StockService();

export const stockResolvers = {
  Query: {
    stocks: async (_: any, { page = 1, limit = 10, filter }: { page: number, limit: number, filter?: StockFilterInput }): Promise<StocksResponse> => {
      return await stockService.getStocks(page, limit, filter);
    },
    
    stockByCode: async (_: any, { code }: { code: string }): Promise<Stock | null> => {
      return await stockService.getStockByCode(code);
    },
    
    stocksByIndustry: async (_: any, { industry }: { industry: string }): Promise<Stock[]> => {
      return await stockService.getStocksByIndustry(industry);
    },
    
    exchanges: async (): Promise<string[]> => {
      return await stockService.getExchanges();
    },
    
    industries: async (): Promise<string[]> => {
      return await stockService.getIndustries();
    }
  },
  
  Mutation: {
    // Add mutations if needed
  }
}; 