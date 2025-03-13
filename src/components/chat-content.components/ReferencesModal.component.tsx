import React, { useState } from 'react';
import { Document } from '../../types/Document.types';
import { Modal } from '../common/Modal.component';
import { DocumentView } from './DocumentView.component';
import { Pagination } from '../common/Pagination.component';

interface ReferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
}

export const ReferencesModal: React.FC<ReferencesModalProps> = ({ isOpen, onClose, documents }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);

  if (!isOpen || documents.length === 0) return null;

  const currentDoc = documents[currentDocIndex];

  const handlePrevious = () => {
    setCurrentDocIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentDocIndex((prev) => (prev < documents.length - 1 ? prev + 1 : prev));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Tài liệu tham khảo'>
      <DocumentView document={currentDoc} />
      <Pagination currentPage={currentDocIndex} totalPages={documents.length} onPrevious={handlePrevious} onNext={handleNext} />
    </Modal>
  );
};
