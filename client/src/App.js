import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box, Typography, Button } from '@mui/material';
import { PersonOutline } from '@mui/icons-material';
import Auth from './components/Auth';
import useAuthStore from './store/authStore';
import BackgroundImg from './assets/6205261.jpg';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#fff',
    },
  },
});

const Dashboard = () => {
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${BackgroundImg})`,  // Corrected background image syntax
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
          animation: 'fadeIn 0.5s ease-out',
          '@keyframes fadeIn': {
            from: {
              opacity: 0,
              transform: 'translateY(20px)'
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom sx={{color: ''}}>
          Welcome to Dashboard!
        </Typography>
        <PersonOutline sx={{ color: '#243642', fontSize: 30 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginY: '1rem',
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
          }}
        >

          <Typography 
            variant="h6" 
            sx={{
              color: '#243642',
              fontWeight: 500
            }}
          >
            {user?.username || 'User'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={logout}
          sx={{
            mt: 3,
            padding: '10px 20px',
            fontSize: '15px',
            fontWeight: 'semibold',
            backgroundColor: 'rgba(249, 84, 84, 0.9)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(198, 46, 46, 0.9)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

const App = () => {
  const token = useAuthStore(state => state.token);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {token ? <Dashboard /> : <Auth />}
    </ThemeProvider>
  );
};

export default App;