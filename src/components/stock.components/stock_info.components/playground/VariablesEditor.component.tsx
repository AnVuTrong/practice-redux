import React from 'react';

interface VariablesEditorProps {
  variables: string;
  setVariables: (variables: string) => void;
  onExecute: () => void;
  isLoading: boolean;
}

const VariablesEditor: React.FC<VariablesEditorProps> = ({ 
  variables, 
  setVariables, 
  onExecute, 
  isLoading 
}) => {
  return (
    <div>
      <label className="block mb-2">Variables (JSON):</label>
      <textarea
        className="w-full h-32 p-2 font-mono text-sm border rounded mb-4"
        value={variables}
        onChange={(e) => setVariables(e.target.value)}
      />
      
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={onExecute}
        disabled={isLoading}
      >
        Execute Query
      </button>
    </div>
  );
};

export default VariablesEditor; 