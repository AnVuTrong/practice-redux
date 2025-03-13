import React from 'react';
import { ApolloError } from '@apollo/client';

interface QueryResultProps {
  loading: boolean;
  error?: ApolloError;
  data?: any;
}

const QueryResult: React.FC<QueryResultProps> = ({ loading, error, data }) => {
  return (
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
  );
};

export default QueryResult; 