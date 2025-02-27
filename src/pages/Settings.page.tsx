import React from 'react';
import { useAppSelector } from '../hooks/redux.hook';
import { ProfileForm } from '../components/settings.components/ProfileForm.component';
import { SettingsSidebar } from '../components/settings.components/SettingsSidebar.component';

const Settings = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  if (!currentUser) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>Please log in to view settings</p>
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto h-full'>
      <div className='flex h-full min-h-screen'>
        <SettingsSidebar />
        <div className='flex-1 p-8'>
          <div className='max-w-2xl mx-auto'>
            <h1 className='text-2xl font-bold mb-6'>Cài đặt tài khoản</h1>
            <div className='bg-white rounded-lg shadow-md p-4 md:p-6 mb-8'>
              <ProfileForm currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
