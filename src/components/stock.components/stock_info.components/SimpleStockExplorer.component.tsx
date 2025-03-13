import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_STOCK = gql`
  query GetStock($code: String!) {
    stockByCode(code: $code) {
      code
      fullname_vi
      exchange
      description
      market_cap
    }
  }
`;

const SimpleStockExplorer = () => {
  const [stockCode, setStockCode] = useState('A32');
  
  const { loading, error, data } = useQuery(GET_STOCK, {
    variables: { code: stockCode },
    skip: !stockCode
  });
  
  return (
    <div className="p-4 border rounded">
      <div className="mb-4">
        <label className="block mb-2">Enter Stock Code:</label>
        <div className="flex">
          <input
            type="text"
            value={stockCode}
            onChange={(e) => setStockCode(e.target.value)}
            className="border p-2 mr-2"
            placeholder="e.g., A32"
          />
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setStockCode(stockCode)}
          >
            Fetch
          </button>
        </div>
      </div>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded">
          <p>Error: {error.message}</p>
        </div>
      )}
      
      {data && data.stockByCode && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">{data.stockByCode.code} - {data.stockByCode.fullname_vi}</h3>
          <p><strong>Exchange:</strong> {data.stockByCode.exchange}</p>
          <p><strong>Market Cap:</strong> {(data.stockByCode.market_cap / 1000000000).toFixed(2)} tỷ VND</p>
          <p className="mt-2"><strong>Description:</strong></p>
          <p className="text-sm">{data.stockByCode.description}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleStockExplorer;