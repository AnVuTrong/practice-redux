import React, { useState } from 'react';

interface Document {
  id: string;
  title: string;
  content: string;
  relevanceScore: number; // 0-100
}

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({
  isOpen,
  onClose,
  documents
}) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  
  if (!isOpen || documents.length === 0) return null;
  
  const currentDoc = documents[currentDocIndex];
  
  const handlePrevious = () => {
    setCurrentDocIndex(prev => (prev > 0 ? prev - 1 : prev));
  };
  
  const handleNext = () => {
    setCurrentDocIndex(prev => (prev < documents.length - 1 ? prev + 1 : prev));
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background-primary rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-secondary p-4">
          <h2 className="text-lg font-bold text-primary">Tài liệu tham khảo</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Document Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4">
            <h3 className="text-md font-bold">{currentDoc.title}</h3>
            <div className="flex items-center mt-1 mb-3">
              <span className="text-sm text-text-secondary mr-2">
                Độ liên quan:
              </span>
              <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${currentDoc.relevanceScore}%` }}
                />
              </div>
              <span className="ml-2 text-sm font-medium">
                {currentDoc.relevanceScore}%
              </span>
            </div>
          </div>
          <div className="whitespace-pre-wrap text-sm bg-secondary/20 p-3 rounded-lg">
            {currentDoc.content}
          </div>
        </div>
        
        {/* Navigation Footer */}
        <div className="border-t border-secondary p-3 flex justify-between items-center">
          <button 
            onClick={handlePrevious}
            disabled={currentDocIndex === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
              currentDocIndex === 0 
                ? 'text-text-secondary bg-secondary/30 cursor-not-allowed' 
                : 'bg-secondary hover:bg-secondary-dark text-primary transition-colors'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Trước
          </button>
          
          <div className="text-sm font-medium">
            {currentDocIndex + 1}/{documents.length}
          </div>
          
          <button 
            onClick={handleNext}
            disabled={currentDocIndex === documents.length - 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
              currentDocIndex === documents.length - 1 
                ? 'text-text-secondary bg-secondary/30 cursor-not-allowed' 
                : 'bg-secondary hover:bg-secondary-dark text-primary transition-colors'
            }`}
          >
            Sau
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}; 