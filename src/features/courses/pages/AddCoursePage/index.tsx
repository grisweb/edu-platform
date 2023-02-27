import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { PageTitle, Paper } from 'components/ui';
import { Form, TextField, ImageField, SubmitButton } from 'components/form';
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
    <Paper>
      <PageTitle title="Создать курс" sx={{ marginBottom: '30px' }} />
      <Form onSubmit={handleSubmit}>
        <TextField name="name" label="Название" required />
        <TextField name="description" label="Описание" multiline />
        <ImageField name="image" label="Изображение курса" />
        <SubmitButton text="Создать" disabled={isLoading} />
      </Form>
    </Paper>
  );
};

export default AddCoursePage;
