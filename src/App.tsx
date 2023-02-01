import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { Typography } from '@mui/material';

import { LoginPage } from 'pages';
import MainLayout from 'components/MainLayout';
import FullScreenLoader from 'components/FullScreenLoader';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setToken } from 'store/slices/authSlice';

import ROUTES from 'constants/routes';
import RequireRole from './components/RequireRole';

const App: FC = () => {
  const { instance, accounts } = useMsal();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (accounts.length > 0) {
      const accessTokenRequest = {
        scopes: ['user.read', 'User.ReadBasic.All'],
        account: accounts[0]
      };

      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          const { accessToken } = accessTokenResponse;
          dispatch(setToken(accessToken));
          setIsLoading(false);
        })
        .catch();
    } else {
      setIsLoading(false);
    }
  }, [accounts, dispatch, instance]);

  const serverConnected = useAppSelector((state) => state.auth.serverConnected);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!serverConnected) {
    return <Typography>No connection to server</Typography>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          {ROUTES.map(({ page: Page, roles, path }) => (
            <Route
              path={path}
              key={path}
              element={<RequireRole roles={roles} />}
            >
              <Route path="" element={<Page />} />
            </Route>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
