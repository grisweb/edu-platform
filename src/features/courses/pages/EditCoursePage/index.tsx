import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { pick } from 'lodash';

import { PageLoader, PageTitle, Paper } from 'components/ui';
import { Form, ImageField, SubmitButton, TextField } from 'components/form';

import {
  useGetCourseQuery,
  useUpdateCourseMutation
} from 'store/services/courseApi';
import { Course } from 'interfaces/courses';

type EditCourse = Pick<Course, 'name' | 'description' | 'image'>;

const EditCoursePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: course, isFetching } = useGetCourseQuery(id as string);

  const [editData, setEditData] = useState<EditCourse>();

  useEffect(() => {
    if (course) {
      setEditData(pick(course, ['name', 'description', 'image']));
    }
  }, [course]);

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data: Course) => {
    try {
      await updateCourse({ id: id as string, course: data }).unwrap();
      navigate(`/courses/${id}`);
      enqueueSnackbar('Курс изменен успешно!', {
        variant: 'success'
      });
    } catch {
      enqueueSnackbar('Ошибка изменения курса!', {
        variant: 'error'
      });
    }
  };

  return isFetching && !editData ? (
    <PageLoader />
  ) : (
    <Paper>
      <PageTitle title="Редактировать курс" sx={{ marginBottom: '30px' }} />
      <Form onSubmit={handleSubmit} values={editData} edit>
        <TextField name="name" label="Название" required />
        <TextField name="description" label="Описание" multiline />
        <ImageField name="image" label="Изображение курса" />
        <SubmitButton text="Изменить" disabled={isLoading} />
      </Form>
    </Paper>
  );
};

export default EditCoursePage;
