import { FC } from 'react';

import { ThemeProvider } from '@mui/material';

import theme from './theme';

import Dashboard from './components/Dashboard';

const MainLayout: FC = () => (
  <ThemeProvider theme={theme}>
    <Dashboard />
  </ThemeProvider>
);
export default MainLayout;
