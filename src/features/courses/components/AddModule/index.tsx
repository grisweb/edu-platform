import { FC, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Button, Paper, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import { Form, TextField } from 'components/form';
import { ActionButton } from 'components/ui';
import { useAddModuleMutation } from 'store/services/courseApi';

import { Module } from 'interfaces/courses';

interface AddModuleProps {
  courseId: string;
}

const AddModule: FC<AddModuleProps> = ({ courseId }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  const [addModule, { isLoading }] = useAddModuleMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async ({ name }: Module) => {
    try {
      await addModule({ name, courseId }).unwrap();
      setIsActive(false);
    } catch {
      enqueueSnackbar('Ошибка добавления модуля!', {
        variant: 'error'
      });
    }
  };

  return isActive ? (
    <Paper sx={{ padding: '15px', width: '50%' }} elevation={1}>
      <Form onSubmit={handleSubmit} withStack={false}>
        <TextField
          name="name"
          label="Название модуля"
          muiTextFieldProps={{
            inputRef: (input) => isActive && input && input.focus(),
            variant: 'standard',
            fullWidth: true
          }}
        />
        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction="row"
          marginTop="15px"
        >
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            variant="contained"
            type="submit"
            size="small"
            disabled={isLoading}
          >
            Добавить
          </Button>
        </Stack>
      </Form>
    </Paper>
  ) : (
    <Box
      borderTop="1px solid"
      paddingTop="10px"
      borderColor={(theme) => theme.colors.border}
    >
      <ActionButton
        text="Добавить модуль"
        icon={Add}
        onClick={handleClick}
        sx={{
          color: 'gray',
          ':hover': {
            backgroundColor: 'rgb(95 97 98 / 4%)'
          }
        }}
      />
    </Box>
  );
};

export default AddModule;
