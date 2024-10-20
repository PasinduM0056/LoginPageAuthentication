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
    <div className="container">
      <div className="auth-container">
        <div className='auth-glass'>
          <div className="auth-card">
            <div className="auth-header">
              <Typography variant="h5" component="h1">
                {isLogin ? 'Sign In' : 'Create New Account'}
              </Typography>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <TextField
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  width: '300px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#243642', // Default outline color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#433878', // Outline color when focused/clicked
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#243642', // Default label color
                  },
                  '& .Mui-focused .MuiInputLabel-root': {
                    color: '#433878', // Label color when focused
                  },
                }}
                InputProps={{
                  startAdornment: <PersonOutline sx={{ mr: 1, color: '#243642' }} />,
                }}
              />

              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  width: '300px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#243642', // Default outline color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#433878', // Outline color when focused/clicked
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#243642', // Default label color
                  },
                  '& .Mui-focused .MuiInputLabel-root': {
                    color: '#433878', // Label color when focused
                  },
                }}
                InputProps={{
                  startAdornment: <LockOutlined sx={{ mr: 1, color: '#243642' }} />,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  bgcolor: '#7E60BF',
                  '&:hover': { bgcolor: '#433878' },
                  height: '40px',
                  width: '300px'
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
      </div>
    </div>
  );
};

export default Auth;
