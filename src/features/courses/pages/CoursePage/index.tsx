import { FC } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';
import { Folder, Forum } from '@mui/icons-material';

import { useGetCourseQuery } from 'store/services/courseApi';

import { ActionButton, PageTitle, Paper, PageLoader } from 'components/ui';

import CourseActions from '../../components/CourseActions';
import AddModule from '../../components/AddModule';
import ModuleCard from '../../components/Module';

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
    <Stack spacing={2}>
      <Paper>
        <Box
          paddingBottom="15px"
          borderBottom="1px solid"
          borderColor={(theme) => theme.colors.border}
        >
          <PageTitle
            title={data.name}
            endAdornment={<CourseActions id={data.id} />}
            sx={{
              marginBottom: 0
            }}
          />
          <Typography variant="body1" sx={{ width: '50%', marginTop: '5px' }}>
            {data.description}
          </Typography>
        </Box>
        <Stack marginTop="10px" direction="row" spacing={2}>
          <ActionButton
            MuiButtonProps={{
              component: Link,
              to: 'materials',
              color: 'success'
            }}
            icon={Folder}
            text="Материалы курса"
          />
          <ActionButton
            MuiButtonProps={{
              component: Link,
              to: 'ads',
              color: 'info'
            }}
            icon={Forum}
            text="Объявления"
          />
        </Stack>
      </Paper>
      {data.modules.map((module) => (
        <ModuleCard key={module.id} {...module} />
      ))}
      <AddModule courseId={data.id} />
    </Stack>
  ) : null;
};

export default CoursePage;
