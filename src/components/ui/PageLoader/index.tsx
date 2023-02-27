import { FC } from 'react';
import { Box, CircularProgress, Paper } from '@mui/material';

const PageScreenLoader: FC = () => {
  return (
    <Paper elevation={1} sx={{ height: '100%' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: '100%' }}
      >
        <CircularProgress />
      </Box>
    </Paper>
  );
};

export default PageScreenLoader;
