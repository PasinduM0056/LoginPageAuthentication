import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { LockOutlined, PersonOutline } from '@mui/icons-material';
import useAuthStore from '../store/authStore';
import '../styles/Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await login(username, password);
    } else {
      const success = await register(username, password);
      if (success) {
        setIsLogin(true);
        setUsername('');
        setPassword('');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    clearError();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <LockOutlined sx={{ fontSize: 40, color: '#6366f1', mb: 2 }} />
          <Typography variant="h5" component="h1">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: <PersonOutline sx={{ mr: 1, color: 'gray' }} />,
            }}
          />

          <TextField
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockOutlined sx={{ mr: 1, color: 'gray' }} />,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              bgcolor: '#6366f1',
              '&:hover': { bgcolor: '#4f46e5' },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>

        <div className="auth-switch">
          <Button onClick={toggleMode}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Sign In'}
          </Button>
        </div>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={clearError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={clearError}>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Auth;