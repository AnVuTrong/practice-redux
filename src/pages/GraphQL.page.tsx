import React from 'react';

const GraphQL = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">GraphQL Learning</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Getting Started with GraphQL</h2>
        
        <p className="mb-4">
          This is a placeholder page for learning GraphQL. You can add your notes, examples, and practice code here.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium mb-2">What is GraphQL?</h3>
          <p>
            GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. 
            It provides a complete and understandable description of the data in your API and gives clients the power 
            to ask for exactly what they need.
          </p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">Key Concepts</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Schema Definition Language (SDL)</li>
            <li>Queries and Mutations</li>
            <li>Resolvers</li>
            <li>Type System</li>
            <li>Fragments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraphQL;
