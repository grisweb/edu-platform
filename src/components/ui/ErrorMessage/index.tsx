import { FC } from 'react';
import { Box } from '@mui/material';
import { FieldError } from 'react-hook-form';

interface ErrorMessageProps {
  error: FieldError | undefined;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) =>
  error ? (
    <Box sx={{ padding: '5px 14px 0', color: 'error', fontSize: '14px' }}>
      {error.message}
    </Box>
  ) : null;

export default ErrorMessage;
