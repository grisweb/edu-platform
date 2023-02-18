import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

import PageTitle from 'components/PageTitle';
import { Form, TextField, ImageField } from 'components/form';
import { useAddCourseMutation } from 'store/services/courseApi';

import { Course } from 'interfaces/courses';

const AddCoursePage: FC = () => {
  const [createCourse, { isLoading }] = useAddCourseMutation();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSubmit = async (data: Course) => {
    try {
      const { id } = await createCourse(data).unwrap();
      navigate(`/courses/${id}`);
      enqueueSnackbar('Курс создан успешно!', {
        variant: 'success'
      });
    } catch {
      enqueueSnackbar('Ошибка создания курса!', {
        variant: 'error'
      });
    }
  };

  return (
    <Paper sx={{ padding: '15px' }} elevation={1}>
      <PageTitle title="Создать курс" sx={{ marginBottom: '30px' }} />
      <Form onSubmit={handleSubmit}>
        <TextField name="name" label="Название" required />
        <TextField name="description" label="Описание" multiline />
        <ImageField />
        <Button type="submit" variant="contained" disabled={isLoading}>
          Создать
        </Button>
      </Form>
    </Paper>
  );
};

export default AddCoursePage;
