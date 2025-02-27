import React, { useState } from 'react';
import { ActionButton } from './ActionButton.component';
import { ReferencesModal } from './ReferencesModal.component';
import { getReferencesForMessage } from '../../services/references.service';
import { createMessageActions } from '../../constants/MessageActions.constant';

interface MessageActionsProps {
  onCopy: () => void;
  onEdit: () => void;
  messageId: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({ onCopy, onEdit, messageId }) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isReferencesModalOpen, setIsReferencesModalOpen] = useState(false);

  const handleReferencesClick = () => {
    setIsReferencesModalOpen(true);
  };

  const actions = createMessageActions(onCopy, onEdit, handleReferencesClick);

  return (
    <>
      <div className='absolute bottom-1 right-1 flex space-x-1'>
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            icon={action.icon}
            tooltip={action.tooltip}
            onClick={action.onClick}
            onMouseEnter={() => setShowTooltip(action.id)}
            onMouseLeave={() => setShowTooltip(null)}
            showTooltip={showTooltip === action.id}
            actionType={action.id}
          />
        ))}
      </div>

      <ReferencesModal
        isOpen={isReferencesModalOpen}
        onClose={() => setIsReferencesModalOpen(false)}
        documents={getReferencesForMessage(messageId)}
      />
    </>
  );
};
