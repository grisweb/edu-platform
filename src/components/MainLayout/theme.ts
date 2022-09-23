import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    options: {
      drawerWidth: number;
    };
  }

  interface ThemeOptions {
    options?: {
      drawerWidth?: number;
    };
  }
}

const theme = createTheme({
  options: {
    drawerWidth: 240
  }
});

export default theme;
