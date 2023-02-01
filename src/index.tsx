import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider as ReduxProvider } from 'react-redux';
import { MsalProvider } from '@azure/msal-react';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';

import { SnackbarProvider } from 'notistack';

import { store } from './store/store';
import App from './App';

const configuration: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID || '',
    authority: process.env.REACT_APP_AZURE_AUTHORITY || ''
  },
  cache: {
    cacheLocation: 'localStorage'
  }
};

const pca = new PublicClientApplication(configuration);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <MsalProvider instance={pca}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </MsalProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
