import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  
  return {
    user: initialUser,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,

    login: async (username, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
        });
        const { token } = response.data;
        const userData = { username }; 
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        set({ 
          token, 
          user: userData,
          isLoading: false, 
          error: null 
        });
        return true;
      } catch (error) {
        set({
          error: error.response?.data?.message || 'An error occurred',
          isLoading: false,
        });
        return false;
      }
    },

    register: async (username, password) => {
      set({ isLoading: true, error: null });
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username,
          password,
        });
        set({ isLoading: false });
        return true;
      } catch (error) {
        set({
          error: error.response?.data?.message || 'An error occurred',
          isLoading: false,
        });
        return false;
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ token: null, user: null });
    },

    clearError: () => set({ error: null }),
  };
});

export default useAuthStore;