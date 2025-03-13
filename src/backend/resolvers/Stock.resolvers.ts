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
          if (filter.exchange === 'Exchange không xác định') {
            query.$or = [
              { exchange: { $exists: false } },
              { exchange: null },
              { exchange: "" }
            ];
          } else {
            query.exchange = filter.exchange;
          }
        }
        
        if (filter.search) {
          const searchRegex = { $regex: filter.search, $options: 'i' };
          if (!query.$or) {
            query.$or = [];
          }
          query.$or = [
            { code: searchRegex },
            { fullname_vi: searchRegex }
          ];
        }
        
        console.log("MongoDB Query:", JSON.stringify(query, null, 2));
        
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
      },
      
      allExchanges: async (_: any, __: any, { stockCollection }: Context) => {
        try {
          // Lấy tất cả các giá trị exchange khác nhau từ database
          const exchanges = await stockCollection.distinct("exchange");
          
          // Lọc ra các giá trị hợp lệ
          const validExchanges = exchanges.filter(e => e !== null && e !== undefined && e !== "");
          
          // Đếm số lượng cổ phiếu không có giá trị exchange
          const missingExchangeCount = await stockCollection.countDocuments({
            $or: [
              { exchange: { $exists: false } },
              { exchange: null },
              { exchange: "" }
            ]
          });
          
          // Nếu có cổ phiếu không có exchange, thêm danh mục "OTHER"
          if (missingExchangeCount > 0) {
            validExchanges.push("Exchange không xác định");
          }
          
          return validExchanges;
        } catch (error) {
          console.error('Error in allExchanges resolver:', error);
          return []; 
        }
      },
      
      allIndustries: async (_: any, __: any, { stockCollection }: Context) => {
        try {
          // Get distinct industries from all levels
          const level1 = await stockCollection.distinct("industry_level1");
          const level2 = await stockCollection.distinct("industry_level2");
          const level3 = await stockCollection.distinct("industry_level3");
          const level4 = await stockCollection.distinct("industry_level4");
          
          // Combine all levels and remove duplicates
          const allIndustries = [...level1, ...level2, ...level3, ...level4]
            .filter(Boolean) // Remove null/undefined/empty values
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
          
          return allIndustries;
        } catch (error) {
          console.error('Error in allIndustries resolver:', error);
          return [];
        }
      },
    },
    Mutation: {
      // Implement mutation resolvers here
    }
  };