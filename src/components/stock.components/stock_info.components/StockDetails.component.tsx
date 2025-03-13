import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_STOCK_DETAILS = gql`
  query GetStockDetails($code: String!) {
    stockByCode(code: $code) {
      _id
      code
      fullname_vi
      fullname_en
      exchange
      industry_level1
      industry_level2
      industry_level3
      industry_level4
      market_cap
      volume_daily
      volume_15_days_average
      diff
      diff_percent
      total_shares_outstanding
      total_shares_listed
      treasury_stock
      listing_date
      website
      address
      description
      firm_category
      firm_category_string
      accounting_firm {
        nam
        donvikiemtoan
      }
      fetch_time
      fetch_url
    }
  }
`;

interface StockDetailsProps {
  stockCode: string;
}

export const StockDetails: React.FC<StockDetailsProps> = ({ stockCode }) => {
  const { loading, error, data } = useQuery(GET_STOCK_DETAILS, {
    variables: { code: stockCode },
    skip: !stockCode
  });

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border h-full">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('GraphQL error details:', error);
    return (
      <div className="bg-red-100 p-6 rounded-lg border border-red-300 h-full">
        <p className="text-red-700">Error loading stock details: {error.message}</p>
      </div>
    );
  }

  if (!data?.stockByCode) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg border h-full flex items-center justify-center">
        <p className="text-gray-500">Stock not found</p>
      </div>
    );
  }

  const stock = data.stockByCode;

  return (
    <div className="bg-white p-6 rounded-lg border h-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{stock.code}</h3>
          <p className="text-gray-600">{stock.fullname_vi}</p>
          <div className="flex space-x-2 mt-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {stock.exchange}
            </span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              {stock.industry_level1}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">Market Cap</span>
          <p className="font-semibold">{stock.market_cap?.toLocaleString()} VND</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">Volume Daily</span>
          <p className="font-semibold">{stock.volume_daily?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">Avg Volume (15d)</span>
          <p className="font-semibold">{stock.volume_15_days_average?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">Price Change</span>
          <p className={`font-semibold ${stock.diff > 0 ? 'text-green-600' : stock.diff < 0 ? 'text-red-600' : ''}`}>
            {stock.diff?.toLocaleString()} ({stock.diff_percent?.toFixed(2)}%)
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">Total Shares</span>
          <p className="font-semibold">{stock.total_shares_outstanding?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">Listed Shares</span>
          <p className="font-semibold">{stock.total_shares_listed?.toLocaleString()}</p>
        </div>
      </div>

      {stock.description && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-gray-700 text-sm">{stock.description}</p>
        </div>
      )}

      {stock.website && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Website</h4>
          <a href={stock.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
            {stock.website}
          </a>
        </div>
      )}

      {stock.address && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Address</h4>
          <p className="text-gray-700 text-sm">{stock.address}</p>
        </div>
      )}
    </div>
  );
}; 