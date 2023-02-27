import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAddLectureMutation } from 'store/services/lectureApi';

import { Form, SubmitButton, TextField, EditorField } from 'components/form';
import { PageTitle, Paper } from 'components/ui';

import { Lecture } from 'interfaces/courses';
import { useSnackbar } from 'notistack';

const AddLecturePage: FC = () => {
  const [addLecture, { isLoading }] = useAddLectureMutation();

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data: Pick<Lecture, 'name' | 'text'>) => {
    try {
      const lecture = await addLecture({
        moduleId: id as string,
        ...data
      }).unwrap();
      navigate(`/lectures/${lecture.id}`);
    } catch {
      enqueueSnackbar('Ошибка создания лекции!', {
        variant: 'error'
      });
    }
  };

  return (
    <Paper>
      <PageTitle title="Создать лекцию" sx={{ marginBottom: '30px' }} />
      <Form onSubmit={handleSubmit}>
        <TextField name="name" label="Название" required />
        <EditorField name="text" label="Контент" />
        <SubmitButton text="Создать" disabled={isLoading} />
      </Form>
    </Paper>
  );
};

export default AddLecturePage;
