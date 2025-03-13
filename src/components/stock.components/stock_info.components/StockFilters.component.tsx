import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_FILTER_OPTIONS = gql`
  query GetFilterOptions {
    exchanges
    industries
  }
`;

interface StockFiltersProps {
  filters: {
    exchange: string;
    industry: string;
    search: string;
  };
  onChange: (filters: {
    exchange: string;
    industry: string;
    search: string;
  }) => void;
}

export const StockFilters: React.FC<StockFiltersProps> = ({ filters, onChange }) => {
  const { data, loading } = useQuery(GET_FILTER_OPTIONS);
  
  const handleExchangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, exchange: e.target.value });
  };
  
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, industry: e.target.value });
  };
  
  const handleReset = () => {
    onChange({ exchange: '', industry: '', search: '' });
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Exchange
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filters.exchange}
            onChange={handleExchangeChange}
            disabled={loading}
          >
            <option value="">All Exchanges</option>
            {data?.exchanges?.map((exchange: string) => (
              <option key={exchange} value={exchange}>
                {exchange}
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={filters.industry}
            onChange={handleIndustryChange}
            disabled={loading}
          >
            <option value="">All Industries</option>
            {data?.industries?.map((industry: string) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}; 