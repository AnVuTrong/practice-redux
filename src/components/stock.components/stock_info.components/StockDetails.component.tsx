import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_STOCK_DETAILS = gql`
  query GetStockDetails($code: String!) {
    stockByCode(code: $code) {
      id
      code
      fullname_vi
      exchange
      industry_level1
      industry_level2
      market_cap
      volume
      pe
      pb
      dividend_yield
      roe
      roa
      description
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
          <span className="text-gray-500 text-sm">Volume</span>
          <p className="font-semibold">{stock.volume?.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">P/E Ratio</span>
          <p className="font-semibold">{stock.pe?.toFixed(2) || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">P/B Ratio</span>
          <p className="font-semibold">{stock.pb?.toFixed(2) || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">ROE</span>
          <p className="font-semibold">{stock.roe ? `${(stock.roe * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <span className="text-gray-500 text-sm">ROA</span>
          <p className="font-semibold">{stock.roa ? `${(stock.roa * 100).toFixed(2)}%` : 'N/A'}</p>
        </div>
      </div>

      {stock.description && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-gray-700 text-sm">{stock.description}</p>
        </div>
      )}
    </div>
  );
}; 