import React, { useState, useEffect, useRef } from 'react';

interface EditableMessageProps {
  content: string;
  isEditing: boolean;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

export const EditableMessage: React.FC<EditableMessageProps> = ({
  content,
  isEditing,
  onSave,
  onCancel
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(content.length, content.length);
    }
  }, [isEditing, content]);

  const handleSave = () => {
    if (editedContent.trim()) {
      onSave(editedContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (!isEditing) {
    return <p className="text-sm">{content}</p>;
  }

  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] text-sm"
        placeholder="Edit message..."
      />
      <div className="flex justify-end mt-2 space-x-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-xs rounded-md bg-secondary hover:bg-secondary-dark transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-1 text-xs rounded-md bg-primary text-white hover:bg-primary-light transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}; 