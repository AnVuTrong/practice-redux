import { Stock, StockFilterInput, StocksResponse } from '../types/Stock.types';
import { MongoClient, Db, Collection } from 'mongodb';

export class StockService {
  private client: MongoClient;
  private db: Db | null = null;
  private stockCollection: Collection<Stock> | null = null;
  
  constructor() {
    // MongoDB connection string - should be in environment variables in production
    const uri = 'mongodb://localhost:27017';
    this.client = new MongoClient(uri);
    this.connect();
  }
  
  private async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db('stock_market');
      this.stockCollection = this.db.collection<Stock>('stocks');
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }
  
  public async getStocks(page: number, limit: number, filter?: StockFilterInput): Promise<StocksResponse> {
    if (!this.stockCollection) {
      throw new Error('Database not connected');
    }
    
    // Build query based on filters
    const query: any = {};
    
    if (filter?.exchange) {
      query.exchange = filter.exchange;
    }
    
    if (filter?.industry) {
      query.industry_level1 = filter.industry;
    }
    
    if (filter?.search) {
      query.$or = [
        { code: { $regex: filter.search, $options: 'i' } },
        { fullname_vi: { $regex: filter.search, $options: 'i' } }
      ];
    }
    
    // Get total count
    const totalCount = await this.stockCollection.countDocuments(query);
    
    // Get paginated results
    const stocks = await this.stockCollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    return {
      totalCount,
      stocks
    };
  }
  
  public async getStockByCode(code: string): Promise<Stock | null> {
    if (!this.stockCollection) {
      throw new Error('Database not connected');
    }
    
    return await this.stockCollection.findOne({ code });
  }
  
  public async getStocksByIndustry(industry: string): Promise<Stock[]> {
    if (!this.stockCollection) {
      throw new Error('Database not connected');
    }
    
    return await this.stockCollection
      .find({ industry_level1: industry })
      .limit(50)
      .toArray();
  }
  
  public async getExchanges(): Promise<string[]> {
    if (!this.stockCollection) {
      throw new Error('Database not connected');
    }
    
    return await this.stockCollection.distinct('exchange');
  }
  
  public async getIndustries(): Promise<string[]> {
    if (!this.stockCollection) {
      throw new Error('Database not connected');
    }
    
    const industries = await this.stockCollection.distinct('industry_level1');
    return industries.filter((industry): industry is string => 
      industry !== undefined && industry !== null
    );
  }
} 