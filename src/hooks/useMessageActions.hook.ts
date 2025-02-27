import { useState } from 'react';
import { useAppDispatch } from './redux.hook';
import { updateMessage } from '../features/chatSlice.feature';

export const useMessageActions = (chatId: string, messageId: string) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleCopyContent = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log('Content copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (newContent: string) => {
    dispatch(
      updateMessage({
        chatId,
        messageId,
        content: newContent
      })
    );
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    handleCopyContent,
    handleEditClick,
    handleSaveEdit,
    handleCancelEdit
  };
};
