import React from 'react';

interface SampleQuery {
  name: string;
  description: string;
  query: string;
}

interface SampleQueriesProps {
  sampleQueries: SampleQuery[];
  onSelectQuery: (query: string) => void;
}

const SampleQueries: React.FC<SampleQueriesProps> = ({ sampleQueries, onSelectQuery }) => {
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-md">
      <h4 className="font-semibold mb-2">Sample Queries:</h4>
      
      <div className="grid grid-cols-2 gap-4">
        {sampleQueries.map((sample, index) => (
          <div key={index}>
            <h5 className="font-medium mb-1">{sample.description}:</h5>
            <pre className="bg-white p-2 rounded text-sm font-mono">
              {sample.query}
            </pre>
            <button 
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              onClick={() => onSelectQuery(sample.query)}
            >
              Use This Query
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleQueries; 