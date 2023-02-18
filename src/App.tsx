import { FC, useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { Typography } from '@mui/material';
import { RedirectRequest, SilentRequest } from '@azure/msal-browser';

import { LoginPage } from 'pages';
import MainLayout from 'components/MainLayout';
import FullScreenLoader from 'components/FullScreenLoader';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setToken } from 'store/slices/authSlice';

import { Route as TypeRoute } from 'interfaces/routes';

import { CustomNavigationClient } from 'utils/NavigationClient';

import ROUTES from 'constants/routes';

import RequireRole from './components/RequireRole';

const App: FC = () => {
  const { instance, accounts, inProgress } = useMsal();

  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  instance.setNavigationClient(navigationClient);

  const { msToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const checkAuthActions = useCallback(
    () => ['login', 'logout'].includes(inProgress),
    // () => inProgress !== 'none',
    [inProgress]
  );

  useEffect(() => {
    if (accounts.length > 0 && inProgress === 'none') {
      const accessTokenRequest: SilentRequest = {
        scopes: ['mail.send', 'user.read', 'User.ReadBasic.All'],
        account: accounts[0]
      };

      const redirectRequest: RedirectRequest = {
        ...accessTokenRequest,
        redirectUri: '/login'
      };

      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          const { accessToken } = accessTokenResponse;
          dispatch(setToken(accessToken));
        })
        .catch(async () => {
          await instance.acquireTokenRedirect(redirectRequest);
        });
    } else if (inProgress === 'none') {
      setIsLoading(false);
    }
  }, [accounts, inProgress, dispatch, instance, checkAuthActions]);

  useEffect(() => {
    if (msToken) {
      setIsLoading(false);
    }
  }, [msToken]);

  const serverConnected = useAppSelector((state) => state.auth.serverConnected);

  if (isLoading || checkAuthActions()) {
    return <FullScreenLoader />;
  }

  if (!serverConnected) {
    return <Typography>No connection to server</Typography>;
  }

  const childRoutesRender = (routes: TypeRoute['children']) => {
    return (
      routes &&
      routes.map(({ path, page: Page, roles, children }) => (
        <Route path={path} key={path} element={<RequireRole roles={roles} />}>
          <Route path="" element={<Page />}>
            {childRoutesRender(children)}
          </Route>
        </Route>
      ))
    );
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        {ROUTES.map(({ page: Page, roles, path, children }) => (
          <Route path={path} key={path} element={<RequireRole roles={roles} />}>
            <Route path="" element={<Page />}>
              {childRoutesRender(children)}
            </Route>
          </Route>
        ))}
      </Route>
    </Routes>
  );
};

export default App;
