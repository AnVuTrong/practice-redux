import { Collection } from 'mongodb';

interface Context {
  stockCollection: Collection;
}

interface StockByCodeArgs {
  code: string;
}

interface StocksByIndustryArgs {
  industry: string;
}

interface StocksByMarketCapArgs {
  minMarketCap: number;
}

interface StocksByAuditorArgs {
  auditor: string;
  year?: number;
}

interface StocksArgs {
  page: number;
  limit: number;
  filter?: {
    exchange?: string;
    industry?: string;
    search?: string;
  };
}

interface StocksResult {
  totalCount: number;
  stocks: any[];
}

export const stockResolvers = {
    Query: {
      allStocks: async (_: any, __: any, { stockCollection }: Context) => {
        return await stockCollection.find({}).toArray();
      },
      
      stockByCode: async (_: any, { code }: StockByCodeArgs, { stockCollection }: Context) => {
        return await stockCollection.findOne({ code });
      },
      
      stocksByIndustry: async (_: any, { industry }: StocksByIndustryArgs, { stockCollection }: Context) => {
        return await stockCollection.find({
          $or: [
            { industry_level1: industry },
            { industry_level2: industry },
            { industry_level3: industry },
            { industry_level4: industry }
          ]
        }).toArray();
      },
      
      stocksByMarketCap: async (_: any, { minMarketCap }: StocksByMarketCapArgs, { stockCollection }: Context) => {
        return await stockCollection.find({
          market_cap: { $gte: minMarketCap }
        }).toArray();
      },
      
      stocksByAuditor: async (_: any, { auditor, year }: StocksByAuditorArgs, { stockCollection }: Context) => {
        const query: any = {
          "accounting_firm": {
            $elemMatch: { "donvikiemtoan": auditor }
          }
        };
        
        if (year) {
          query.accounting_firm.$elemMatch.nam = year;
        }
        
        return await stockCollection.find(query).toArray();
      },
      
      stocks: async (_: any, { page, limit, filter = {} }: StocksArgs, { stockCollection }: Context): Promise<StocksResult> => {
        const query: any = {};
        
        if (filter.exchange) {
          query.exchange = filter.exchange;
        }
        
        if (filter.industry) {
          query.$or = [
            { industry_level1: filter.industry },
            { industry_level2: filter.industry },
            { industry_level3: filter.industry },
            { industry_level4: filter.industry }
          ];
        }
        
        if (filter.search) {
          query.$or = [
            { code: { $regex: filter.search, $options: 'i' } },
            { fullname_vi: { $regex: filter.search, $options: 'i' } }
          ];
        }
        
        const totalCount = await stockCollection.countDocuments(query);
        
        const stocks = await stockCollection
          .find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();
        
        return {
          totalCount,
          stocks
        };
      }
    },
    Mutation: {
      // Implement mutation resolvers here
    }
  };