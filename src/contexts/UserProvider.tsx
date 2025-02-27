import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux.hook';
import { setUser, setLoading } from '../features/userSlice.feature';

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // On app initialization, check if user is stored in localStorage
    const loadUser = async () => {
      dispatch(setLoading(true));
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }
        // You could also fetch user data from an API here
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
};
