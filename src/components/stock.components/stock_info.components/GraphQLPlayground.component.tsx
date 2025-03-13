import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import QueryEditor from './playground/QueryEditor.component';
import VariablesEditor from './playground/VariablesEditor.component';
import QueryResult from './playground/QueryResult.component';
import SampleQueries from './playground/SampleQueries.component';

const GraphQLPlayground: React.FC = () => {
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

  const sampleQueries = [
    {
      name: 'stockByCode',
      description: 'Get Stock by Code',
      query: `{
  stockByCode(code: "A32") {
    code
    fullname_vi
    exchange
    market_cap
  }
}`
    },
    {
      name: 'stocksByIndustry',
      description: 'Get Stocks by Industry',
      query: `{
  stocksByIndustry(industry: "Hàng tiêu dùng") {
    code
    fullname_vi
    industry_level1
    industry_level2
  }
}`
    }
  ];
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">GraphQL Playground</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <QueryEditor query={query} setQuery={setQuery} />
        
        <div>
          <VariablesEditor 
            variables={variables} 
            setVariables={setVariables} 
            onExecute={handleExecute} 
            isLoading={loading} 
          />
          
          <QueryResult loading={loading} error={error} data={data} />
        </div>
      </div>
      
      <SampleQueries 
        sampleQueries={sampleQueries} 
        onSelectQuery={setQuery} 
      />
    </div>
  );
};

export default GraphQLPlayground;