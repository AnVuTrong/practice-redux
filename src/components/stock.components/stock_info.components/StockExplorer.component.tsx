import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { StockList } from './StockList.component';
import { StockDetails } from './StockDetails.component';
import { StockFilters } from './StockFilters.component';
import { StockSearchBar } from './StockSearchBar.component';
import StockPagination from './StockPagination.component';

// GraphQL queries
const GET_STOCKS = gql`
  query GetStocks($page: Int, $limit: Int, $filter: StockFilterInput) {
    stocks(page: $page, limit: $limit, filter: $filter) {
      totalCount
      stocks {
        id
        code
        fullname_vi
        exchange
        industry_level1
        market_cap
      }
    }
  }
`;

const StockExplorer: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    exchange: '',
    industry: '',
    search: ''
  });

  // Fetch stocks data
  const { loading, error, data } = useQuery(GET_STOCKS, {
    variables: {
      page,
      limit,
      filter: {
        exchange: filters.exchange || undefined,
        industry: filters.industry || undefined,
        search: filters.search || undefined
      }
    }
  });

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // Handle stock selection
  const handleStockSelect = (code: string) => {
    setSelectedStock(code);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Stock Explorer</h2>
      
      {/* Search and filters */}
      <StockSearchBar 
        value={filters.search}
        onChange={(search) => handleFilterChange({...filters, search})}
      />
      
      <StockFilters 
        filters={filters}
        onChange={handleFilterChange}
      />
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Stock list */}
        <div className="lg:col-span-1">
          <StockList 
            loading={loading}
            error={error}
            stocks={data?.stocks?.stocks || []}
            selectedStock={selectedStock}
            onSelectStock={handleStockSelect}
          />
          
          {/* Pagination */}
          {data?.stocks && (
            <StockPagination 
              currentPage={page}
              totalCount={data.stocks.totalCount}
              limit={limit}
              onPageChange={handlePageChange}
              onLimitChange={setLimit}
            />
          )}
        </div>
        
        {/* Stock details */}
        <div className="lg:col-span-2">
          {selectedStock ? (
            <StockDetails stockCode={selectedStock} />
          ) : (
            <div className="bg-gray-100 p-6 rounded-lg h-full flex items-center justify-center">
              <p className="text-gray-500">Select a stock to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockExplorer;