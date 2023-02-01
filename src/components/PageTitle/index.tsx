import { FC } from 'react';
import { Typography } from '@mui/material';

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => (
  <Typography variant="h5" component="h1" sx={{ marginBottom: '16px' }}>
    {title}
  </Typography>
);

export default PageTitle;
