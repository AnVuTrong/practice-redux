import React from 'react';
import StockExplorerContainer from './explorer.components/StockExplorerContainer.component';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_EXCHANGES = gql`
  query GetAllExchanges {
    allExchanges
  }
`;

const StockExplorer: React.FC = () => {
  const { loading: loadingExchanges, error: exchangesError, data: exchangesData } = useQuery(GET_EXCHANGES);

  // Extract exchanges data or provide empty array as fallback
  const exchanges = exchangesData?.allExchanges || [];

  return <StockExplorerContainer 
    exchanges={exchanges} 
  />;
};

export default StockExplorer;