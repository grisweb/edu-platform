import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

import { LoginPage } from 'pages';
import MainLayout from 'components/MainLayout';
import FullScreenLoader from 'components/FullScreenLoader';

import { useAppDispatch } from 'store/hooks';
import { setToken } from 'store/slices/authSlice';

import ROUTES from 'constants/routes';
import RequireRole from './components/RequireRole';

const App: FC = () => {
  const { instance, accounts } = useMsal();
  const authenticated = useIsAuthenticated();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      const accessTokenRequest = {
        scopes: ['user.read'],
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
  }, [accounts, authenticated, dispatch, instance]);

  return isLoading ? (
    <FullScreenLoader />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          {ROUTES.map(({ page: Page, roles, path }) => (
            <Route element={<RequireRole roles={roles} />}>
              <Route key={path} path={path} element={<Page />} />
            </Route>
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
