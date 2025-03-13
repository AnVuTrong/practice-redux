import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const GraphQLPlayground = () => {
  const [query, setQuery] = useState(`{
  stockByCode(code: "A32") {
    code
    fullname_vi
    exchange
    market_cap
  }
}`);
  const [variables, setVariables] = useState('{}');
  
  // Define a generic query that can be modified at runtime
  const DYNAMIC_QUERY = gql`
    query DynamicQuery($queryString: String!) {
      __typename
    }
  `;
  
  const [executeQuery, { loading, error, data }] = useLazyQuery(gql`${query}`);
  
  const handleExecute = () => {
    try {
      executeQuery({
        variables: JSON.parse(variables)
      });
    } catch (err) {
      console.error("Error executing query:", err);
    }
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">GraphQL Playground</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Query:</label>
          <textarea
            className="w-full h-64 p-2 font-mono text-sm border rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-2">Variables (JSON):</label>
          <textarea
            className="w-full h-32 p-2 font-mono text-sm border rounded mb-4"
            value={variables}
            onChange={(e) => setVariables(e.target.value)}
          />
          
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleExecute}
            disabled={loading}
          >
            Execute Query
          </button>
          
          <div className="bg-gray-100 p-2 rounded">
            <label className="block mb-2">Result:</label>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            {data && (
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <h4 className="font-semibold mb-2">Sample Queries:</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium mb-1">Get Stock by Code:</h5>
            <pre className="bg-white p-2 rounded text-sm font-mono">
{`{
  stockByCode(code: "A32") {
    code
    fullname_vi
    exchange
    market_cap
  }
}`}
            </pre>
            <button 
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              onClick={() => setQuery(`{
  stockByCode(code: "A32") {
    code
    fullname_vi
    exchange
    market_cap
  }
}`)}
            >
              Use This Query
            </button>
          </div>
          
          <div>
            <h5 className="font-medium mb-1">Get Stocks by Industry:</h5>
            <pre className="bg-white p-2 rounded text-sm font-mono">
{`{
  stocksByIndustry(industry: "Hàng tiêu dùng") {
    code
    fullname_vi
    industry_level1
    industry_level2
  }
}`}
            </pre>
            <button 
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              onClick={() => setQuery(`{
  stocksByIndustry(industry: "Hàng tiêu dùng") {
    code
    fullname_vi
    industry_level1
    industry_level2
  }
}`)}
            >
              Use This Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphQLPlayground;