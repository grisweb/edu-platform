import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    options: {
      drawerWidth: number;
    };
    colors: {
      border: CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    options?: {
      drawerWidth?: number;
    };
    colors?: {
      border?: CSSProperties['color'];
    };
  }
}

const theme = createTheme(
  { options: { drawerWidth: 240 }, colors: { border: '#e1dfdd' } },
  ruRU
);

export default theme;
