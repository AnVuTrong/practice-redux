import React from 'react';
import { StockSearchBar } from '../StockSearchBar.component';
import { StockFilters } from '../StockFilters.component';

interface StockExplorerHeaderProps {
  filters: {
    exchange: string;
    industry: string;
    search: string;
  };
  onFilterChange: (filters: {
    exchange: string;
    industry: string;
    search: string;
  }) => void;
}

const StockExplorerHeader: React.FC<StockExplorerHeaderProps> = ({ 
  filters, 
  onFilterChange 
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
      />
    </>
  );
};

export default StockExplorerHeader; 