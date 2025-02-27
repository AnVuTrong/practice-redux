import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { updateUserProfile } from '../features/userSlice.feature';

const Settings = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);
  
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    lastName: '',
    avatar: '',
  });
  
  const [isSaved, setIsSaved] = useState(false);

  // Initialize form with current user data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        avatar: currentUser.avatar || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user profile in Redux store
    dispatch(updateUserProfile({
      name: formData.name,
      firstName: formData.firstName,
      lastName: formData.lastName,
      avatar: formData.avatar.charAt(0).toUpperCase(), // Just use the first character as avatar
    }));
    
    // Show success message
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Please log in to view settings</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-primary mb-6">Cài đặt tài khoản</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin cá nhân</h2>
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tên người dùng
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Họ
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                Ký tự hiển thị (avatar)
              </label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                maxLength={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Chỉ ký tự đầu tiên sẽ được sử dụng</p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={currentUser.email || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email không thể thay đổi</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors"
            >
              Lưu thay đổi
            </button>
          </div>
          
          {isSaved && (
            <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center">
              Thay đổi đã được lưu thành công!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings; 