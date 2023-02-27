import { FC, PropsWithChildren } from 'react';
import { Paper as MuiPaper } from '@mui/material';

const Paper: FC<PropsWithChildren> = ({ children }) => (
  <MuiPaper sx={{ padding: '15px' }} elevation={1}>
    {children}
  </MuiPaper>
);

export default Paper;
