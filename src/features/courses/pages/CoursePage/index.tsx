import { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import { useParams, Navigate } from 'react-router-dom';

import { useGetCourseQuery } from 'store/services/courseApi';

import PageTitle from 'components/PageTitle';
import PageLoader from 'components/PageLoader';

import CourseActions from '../../components/CourseActions';

const CoursePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetCourseQuery(id as string);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Navigate to="/courses" />;
  }

  return data ? (
    <Paper sx={{ padding: '15px' }} elevation={1}>
      <PageTitle
        title={data.name}
        endAdornment={<CourseActions id={data.id} />}
      />
      <Typography variant="body1">{data.description}</Typography>
    </Paper>
  ) : null;
};

export default CoursePage;
