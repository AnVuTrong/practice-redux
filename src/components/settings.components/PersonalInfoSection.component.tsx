import React from 'react';
import { FormField } from './FormField.component';
import { FormSection } from './FormSection.component';
import { User } from '../../features/UserSlice.feature';

interface PersonalInfoSectionProps {
  formData: {
    name: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  currentUser: User;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ formData, currentUser, onChange }) => {
  return (
    <FormSection title=''>
      <FormField id='name' name='name' label='Tên người dùng' value={formData.name} onChange={onChange} required />

      <div className='flex flex-col gap-2'>
        <FormField id='firstName' name='firstName' label='Tên' value={formData.firstName} onChange={onChange} />

        <FormField id='lastName' name='lastName' label='Họ' value={formData.lastName} onChange={onChange} />
      </div>

      <FormField
        id='avatar'
        name='avatar'
        label='Ký tự hiển thị (avatar)'
        value={formData.avatar}
        onChange={onChange}
        maxLength={1}
        helpText='Chỉ ký tự đầu tiên sẽ được sử dụng'
      />

      <FormField
        id='email'
        name='email'
        label='Email'
        value={currentUser.email || ''}
        onChange={() => {}}
        disabled
        helpText='Email không thể thay đổi'
      />
    </FormSection>
  );
};
