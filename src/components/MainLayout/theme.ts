import { createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

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

const theme = createTheme({ options: { drawerWidth: 240 } }, ruRU);

export default theme;
