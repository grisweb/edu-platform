import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { PageLoader, PageTitle, Paper } from 'components/ui';
import { useGetLectureQuery } from 'store/services/lectureApi';
import { Box } from '@mui/material';

const LecturePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetLectureQuery(id as string);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <Navigate to="/courses" />;
  }

  return data ? (
    <Paper>
      <Box
        paddingBottom="15px"
        borderBottom="1px solid"
        borderColor={(theme) => theme.colors.border}
      >
        <PageTitle
          title={data.name}
          sx={{
            marginBottom: 0
          }}
        />
      </Box>
      <Box dangerouslySetInnerHTML={{ __html: data.text }} />
    </Paper>
  ) : null;
};

export default LecturePage;
