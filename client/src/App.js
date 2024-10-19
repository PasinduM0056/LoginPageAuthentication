import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Auth from './components/Auth';
import useAuthStore from './store/authStore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {token ? (
        <div style={{ padding: '20px' }}>
          <h1>Welcome to Dashboard!</h1>
          <button onClick={useAuthStore.getState().logout}>Logout</button>
        </div>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
};

export default App;