import React from 'react';

interface StockFiltersProps {
  filters: {
    exchange: string;
    search: string;
  };
  onChange: (filters: {
    exchange: string;
    search: string;
  }) => void;
  exchanges: string[];
}

export const StockFilters: React.FC<StockFiltersProps> = ({
  filters,
  onChange,
  exchanges
}) => {
  const handleExchangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, exchange: e.target.value });
  };
  
  const handleReset = () => {
    onChange({ exchange: '', search: '' });
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
          >
            <option value="">All Exchanges</option>
            {exchanges && exchanges.length > 0 ? (
              exchanges.map((exchange) => (
                <option key={exchange} value={exchange}>
                  {exchange}
                </option>
              ))
            ) : (
              <option disabled>No exchanges available</option>
            )}
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