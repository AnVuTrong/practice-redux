import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux.hook';
import { updateUserProfile, User } from '../../features/userSlice.feature';
import { PersonalInfoSection } from './PersonalInfoSection.component';
import { FormActions } from './FormActions.component';
import { SuccessMessage } from './SuccessMessage.component';
import { useFormState } from '../../utils/FormStateManager';

interface ProfileFormProps {
  currentUser: User;
}

interface UserFormData {
  name: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ currentUser }) => {
  const dispatch = useAppDispatch();
  
  const { state, formManager } = useFormState<UserFormData>({
    name: '',
    firstName: '',
    lastName: '',
    avatar: '',
  });
  
  // Initialize form with current user data
  useEffect(() => {
    if (currentUser) {
      formManager.updateField('name', currentUser.name || '');
      formManager.updateField('firstName', currentUser.firstName || '');
      formManager.updateField('lastName', currentUser.lastName || '');
      formManager.updateField('avatar', currentUser.avatar || '');
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form - provide validation rules for all fields
    const validationRules = {
      name: (value: string) => value.trim() ? null : 'Tên người dùng là bắt buộc',
      firstName: (value: string) => null, // No validation required
      lastName: (value: string) => null, // No validation required
      avatar: (value: string) => value.trim() ? null : 'Ký tự hiển thị là bắt buộc'
    };
    
    if (!formManager.validate(validationRules)) {
      return;
    }
    
    formManager.setLoading(true);
    
    try {
      // Update user profile in Redux store
      dispatch(updateUserProfile({
        name: state.formData.name,
        firstName: state.formData.firstName,
        lastName: state.formData.lastName,
        avatar: state.formData.avatar.charAt(0).toUpperCase(), // Just use the first character as avatar
      }));
      
      // Show success message
      formManager.setSaved(true);
      setTimeout(() => formManager.setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      formManager.setLoading(false);
    }
  };

  // Get actual error messages (filter out undefined/null values)
  const errorMessages = Object.values(state.errors).filter(error => error);

  return (
    <form onSubmit={handleSubmit}>
      <PersonalInfoSection 
        formData={state.formData}
        currentUser={currentUser}
        onChange={(e) => formManager.handleInputChange(e)}
      />
      
      <FormActions isSaving={state.isLoading} />
      
      {state.isSaved && <SuccessMessage message="Thay đổi đã được lưu thành công!" />}
      
      {/* Display validation errors if any */}
      {errorMessages.length > 0 && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md">
          <ul className="list-disc pl-5">
            {errorMessages.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}; 