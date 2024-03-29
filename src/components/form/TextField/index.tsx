import { FC, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

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

  const { fieldState, field } = useController({
    name,
    control,
    rules: {
      required: required ? 'Это значение является обязательным' : undefined
    },
    defaultValue: null
  });

  useEffect(() => {
    if (field.value === '') {
      field.onChange(null);
    }
  }, [field]);

  return (
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
        value={field.value || ''}
      />
      <ErrorMessage error={fieldState.error} />
    </Box>
  );
};

export default TextField;
