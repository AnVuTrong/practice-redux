import React from 'react';

interface FormActionsProps {
  isSaving?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ isSaving = false }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={isSaving}
        className={`px-4 py-2 bg-primary text-white rounded-md transition-colors ${
          isSaving 
            ? 'opacity-70 cursor-not-allowed' 
            : 'hover:bg-primary-light'
        }`}
      >
        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
      </button>
    </div>
  );
}; 