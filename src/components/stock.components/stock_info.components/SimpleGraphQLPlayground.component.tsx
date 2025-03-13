import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const SimpleGraphQLPlayground = () => {
  const [query, setQuery] = useState(`{
  stockByCode(code: "A32") {
    code
    fullname_vi
    exchange
    market_cap
  }
}`);
  
  const [executeQuery, { loading, error, data }] = useLazyQuery(
    gql`${query}`,
    { errorPolicy: 'all' }
  );
  
  return (
    <div className="border rounded p-4">
      <div className="mb-4">
        <label className="block mb-2">GraphQL Query:</label>
        <textarea
          className="w-full h-32 p-2 font-mono text-sm border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => executeQuery()}
        disabled={loading}
      >
        Execute Query
      </button>
      
      <div className="bg-gray-100 p-2 rounded">
        <label className="block mb-2">Result:</label>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && (
          <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-64">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Sample Queries:</h4>
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-2"
          onClick={() => setQuery(`{
  stockByCode(code: "A32") {
    code
    fullname_vi
    exchange
    market_cap
  }
}`)}
        >
          Get Stock
        </button>
        
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          onClick={() => setQuery(`{
  allStocks {
    code
    fullname_vi
    exchange
  }
}`)}
        >
          Get All Stocks
        </button>
      </div>
    </div>
  );
};

export default SimpleGraphQLPlayground; 