import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps
} from '@mui/material';

import { ErrorMessage } from 'components/ui';

interface TextFieldProps {
  name: string;
  label: string;
  required?: boolean;
  multiline?: boolean;
  muiTextFieldProps?: MuiTextFieldProps;
}

const TextField: FC<TextFieldProps> = ({
  name,
  label,
  muiTextFieldProps,
  required = false,
  multiline = false
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue=""
      rules={{
        required: required ? 'Это значение является обязательным' : undefined
      }}
      control={control}
      render={({ field, fieldState }) => (
        <Box width="100%">
          <MuiTextField
            fullWidth
            rows={2}
            multiline={multiline}
            required={required}
            error={!!fieldState.error}
            label={label}
            {...muiTextFieldProps}
            {...field}
          />
          <ErrorMessage error={fieldState.error} />
        </Box>
      )}
    />
  );
};

export default TextField;
