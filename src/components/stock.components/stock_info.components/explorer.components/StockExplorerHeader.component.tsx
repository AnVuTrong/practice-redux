import React from 'react';
import { StockSearchBar } from '../StockSearchBar.component';
import { StockFilters } from '../StockFilters.component';

interface StockExplorerHeaderProps {
  filters: {
    exchange: string;
    search: string;
  };
  onFilterChange: (filters: {
    exchange: string;
    search: string;
  }) => void;
  exchanges: string[];
}

const StockExplorerHeader: React.FC<StockExplorerHeaderProps> = ({ 
  filters, 
  onFilterChange,
  exchanges
}) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Stock Explorer</h2>
      
      {/* Search and filters */}
      <StockSearchBar 
        value={filters.search}
        onChange={(search) => onFilterChange({...filters, search})}
      />
      
      <StockFilters 
        filters={filters}
        onChange={onFilterChange}
        exchanges={exchanges}
      />
    </>
  );
};

export default StockExplorerHeader; 