import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
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
      localStorage.setItem('token', token);
      set({ token, isLoading: false, error: null });
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
    set({ token: null, user: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;