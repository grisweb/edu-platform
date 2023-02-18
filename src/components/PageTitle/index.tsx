import { FC, ReactNode } from 'react';
import { Box, Typography, SxProps } from '@mui/material';

interface PageTitleProps {
  title: string;
  sx?: SxProps;
  endAdornment?: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ title, sx, endAdornment }) => (
  <Box sx={{ marginBottom: '16px', display: 'flex', ...sx }}>
    <Typography variant="h5" component="h1">
      {title}
    </Typography>
    {endAdornment}
  </Box>
);
export default PageTitle;
