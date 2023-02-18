import { FC } from 'react';
import { ThemeProvider } from '@mui/material';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { useGetUserQuery } from 'store/services/authApi';

import FullScreenLoader from 'components/FullScreenLoader';

import theme from './theme';
import Dashboard from './components/Dashboard';

const MainLayout: FC = () => {
  const { msToken } = useAppSelector((state) => state.auth);

  const { data: user, isFetching: isLoading } = useGetUserQuery(null, {
    skip: !msToken
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!user && !isLoading) {
    return <Navigate to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
};

export default MainLayout;
