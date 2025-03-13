import React from 'react';
import { Document } from '../../types/Document.types';
import { ProgressBar } from '../common/ProgressBar.component';

interface DocumentViewProps {
  document: Document;
}

export const DocumentView: React.FC<DocumentViewProps> = ({ document }) => {
  return (
    <div className='flex-1 overflow-y-auto p-4'>
      <div className='mb-4'>
        <h3 className='text-md font-bold'>{document.title}</h3>
        <div className='mt-1 mb-3'>
          <ProgressBar value={document.relevanceScore} maxValue={100} label='Độ liên quan:' />
        </div>
      </div>
      <div className='whitespace-pre-wrap text-sm bg-secondary/20 p-3 rounded-lg'>{document.content}</div>
    </div>
  );
};
