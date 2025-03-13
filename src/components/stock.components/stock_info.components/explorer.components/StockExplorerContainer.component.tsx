import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import StockExplorerHeader from './StockExplorerHeader.component';
import StockExplorerContent from './StockExplorerContent.component';

// GraphQL queries
const GET_STOCKS = gql`
  query GetStocks($page: Int!, $limit: Int!, $filter: StockFilterInput) {
    stocks(page: $page, limit: $limit, filter: $filter) {
      totalCount
      stocks {
        _id
        code
        fullname_vi
        exchange
        industry_level1
        market_cap
      }
    }
  }
`;

const StockExplorerContainer: React.FC = () => {
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
      filter: {}
    },
    onError: (error) => {
      console.error('GraphQL Error:', error);
      console.error('GraphQL Error Details:', error.graphQLErrors);
      console.error('Network Error:', error.networkError);
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
      <StockExplorerHeader 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
        <hr className="border-t border-gray-200 my-4 col-span-full" />
      </div>
      
      <StockExplorerContent 
        loading={loading}
        error={error}
        data={data}
        page={page}
        limit={limit}
        selectedStock={selectedStock}
        onPageChange={handlePageChange}
        onLimitChange={setLimit}
        onSelectStock={handleStockSelect}
      />
    </div>
  );
};

export default StockExplorerContainer; 