import React from 'react';

interface QueryEditorProps {
  query: string;
  setQuery: (query: string) => void;
}

const QueryEditor: React.FC<QueryEditorProps> = ({ query, setQuery }) => {
  return (
    <div>
      <label className="block mb-2">Query:</label>
      <textarea
        className="w-full h-64 p-2 font-mono text-sm border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default QueryEditor; 