import React from 'react';
import { ApolloError } from '@apollo/client';

interface Stock {
  _id: string;
  code: string;
  fullname_vi: string;
  exchange: string;
  industry_level1: string;
  market_cap: number;
}

interface StockListProps {
  loading: boolean;
  error?: ApolloError;
  stocks: Stock[];
  selectedStock: string | null;
  onSelectStock: (code: string) => void;
}

export const StockList: React.FC<StockListProps> = ({
  loading,
  error,
  stocks,
  selectedStock,
  onSelectStock
}) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg border">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg border border-red-300">
        <p className="text-red-700">Error loading stocks: {error.message}</p>
      </div>
    );
  }

  if (stocks.length === 0) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg border">
        <p className="text-gray-500 text-center">No stocks found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exchange
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr 
                key={stock._id || stock.code} 
                onClick={() => onSelectStock(stock.code)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedStock === stock.code ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stock.code}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {stock.fullname_vi}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {stock.exchange}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 