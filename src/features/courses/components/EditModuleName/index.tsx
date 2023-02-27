import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import { useUpdateModuleMutation } from 'store/services/courseApi';
import { Form, TextField } from 'components/form';
import { Module } from 'interfaces/courses';

interface EditModuleNameProps {
  id: string;
  name: string;
  onSubmitted: () => void;
}

const EditModuleName: FC<EditModuleNameProps> = ({ id, name, onSubmitted }) => {
  const [updateModule, { isLoading }] = useUpdateModuleMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async ({ name: updatedName }: Pick<Module, 'name'>) => {
    try {
      await updateModule({ id, name: updatedName });
      onSubmitted();
    } catch {
      enqueueSnackbar('Ошибка изменения названия модуля!', {
        variant: 'error'
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} withStack={false} edit values={{ name }}>
      <TextField
        name="name"
        label="Название модуля"
        required
        muiTextFieldProps={{
          variant: 'outlined',
          InputProps: {
            endAdornment: (
              <Box paddingLeft="10px">
                <Button variant="text" type="submit" disabled={isLoading}>
                  Изменить
                </Button>
              </Box>
            )
          }
        }}
      />
    </Form>
  );
};

export default EditModuleName;
