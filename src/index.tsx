import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { MsalProvider } from '@azure/msal-react';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';

import { SnackbarProvider } from 'notistack';

import { store } from './store/store';
import App from './App';

const configuration: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID as string,
    authority: process.env.REACT_APP_AZURE_AUTHORITY as string,
    knownAuthorities: [process.env.REACT_APP_AZURE_AUTHORITY as string],
    redirectUri: '/',
    postLogoutRedirectUri: '/login'
  },
  cache: {
    cacheLocation: 'localStorage'
  }
};

const pca = new PublicClientApplication(configuration);

if (!pca.getActiveAccount() && pca.getAllAccounts().length > 0) {
  pca.setActiveAccount(pca.getAllAccounts()[0]);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <MsalProvider instance={pca}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReduxProvider>
      </MsalProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
