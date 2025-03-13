import React from 'react';
import { ApolloError } from '@apollo/client';
import { StockList } from '../StockList.component';
import { StockDetails } from '../StockDetails.component';
import StockPagination from '../StockPagination.component';

interface StockExplorerContentProps {
  loading: boolean;
  error?: ApolloError;
  data?: any;
  page: number;
  limit: number;
  selectedStock: string | null;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSelectStock: (code: string) => void;
}

const StockExplorerContent: React.FC<StockExplorerContentProps> = ({
  loading,
  error,
  data,
  page,
  limit,
  selectedStock,
  onPageChange,
  onLimitChange,
  onSelectStock
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Stock list */}
      <div className="lg:col-span-1">
        <StockList 
          loading={loading}
          error={error}
          stocks={data?.stocks?.stocks || []}
          selectedStock={selectedStock}
          onSelectStock={onSelectStock}
        />
        
        {/* Pagination */}
        {data?.stocks && (
          <StockPagination 
            currentPage={page}
            totalCount={data.stocks.totalCount}
            limit={limit}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
          />
        )}
      </div>
      
      {/* Stock details */}
      <div className="lg:col-span-2">
        {selectedStock ? (
          <StockDetails stockCode={selectedStock} />
        ) : (
          <StockEmptyState />
        )}
      </div>
    </div>
  );
};

const StockEmptyState: React.FC = () => (
  <div className="bg-gray-100 p-6 rounded-lg h-full flex items-center justify-center">
    <p className="text-gray-500">Select a stock to view details</p>
  </div>
);

export default StockExplorerContent; 