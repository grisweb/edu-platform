import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Pagination,
  PaginationItem
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';

import { useGetCoursesQuery } from 'store/services/courseApi';

import changeSearchParams from 'utils/changeSearchParams';

import { ActionButton } from 'components/ui';
import PageTitle from 'components/PageTitle';
import CourseCard from '../../components/CourseCard';
import CourseCardSkeleton from '../../components/CourseCardSkeleton';

const CoursesPage: FC = () => {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);

  const search = searchParams.get('search');

  const { data, isFetching: isLoading } = useGetCoursesQuery(
    {
      page,
      perPage: 10,
      search: search || undefined
    },
    {
      refetchOnMountOrArgChange: true
    }
  );

  return (
    <Paper sx={{ padding: '15px' }} elevation={1}>
      <PageTitle title="Курсы" />
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <ActionButton
            MuiButtonProps={{
              component: Link,
              to: '/courses/add'
            }}
            text="Создать курс"
            icon={Add}
          />
        </Box>
        <Box>
          <TextField
            hiddenLabel
            placeholder="Поиск"
            size="small"
            variant="standard"
            InputProps={{
              endAdornment: <Search color="disabled" />
            }}
          />
        </Box>
      </Box>
      <Box margin="30px 0">
        <Box marginBottom="40px">
          <Grid
            container
            alignItems="stretch"
            spacing={3}
            columns={{ sm: 12, md: 10 }}
          >
            {isLoading &&
              Array.from(Array(10)).map((_, index) => (
                <Grid item xs={2} sm={12} md={2} key={String(index + 1)}>
                  <CourseCardSkeleton />
                </Grid>
              ))}
            {!isLoading &&
              data &&
              data.courses.map((course) => (
                <Grid item xs={2} sm={12} md={2} key={course.id}>
                  <CourseCard course={course} />
                </Grid>
              ))}
          </Grid>
        </Box>
        {data && data.pagination.totalPages > 1 && (
          <Pagination
            page={page}
            count={data.pagination.totalPages}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={{
                  pathname: '/courses',
                  search: changeSearchParams(searchParams, {
                    page: item.page || 1
                  })
                }}
                {...item}
              />
            )}
          />
        )}
      </Box>
    </Paper>
  );
};

export default CoursesPage;
