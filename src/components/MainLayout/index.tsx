import { FC, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { useGetUserQuery } from 'store/services/authApi';

import FullScreenLoader from 'components/FullScreenLoader';

import theme from './theme';
import Dashboard from './components/Dashboard';

const MainLayout: FC = () => {
  const { msToken } = useAppSelector((state) => state.auth);

  const { data: user, isLoading } = useGetUserQuery(null, {
    skip: !msToken
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate('/login');
    }
  }, [isLoading, navigate, user]);

  return isLoading ? (
    <FullScreenLoader />
  ) : (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
};
export default MainLayout;
