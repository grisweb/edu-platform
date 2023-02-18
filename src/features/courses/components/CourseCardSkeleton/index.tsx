import { FC } from 'react';

import {
  Skeleton,
  Typography,
  Card,
  CardContent,
  CardActions
} from '@mui/material';

const CourseCardSkeleton: FC = () => {
  return (
    <Card>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="auto"
        sx={{
          aspectRatio: '16/9'
        }}
      />
      <CardContent
        sx={{
          padding: '12px 16px 0'
        }}
      >
        <Typography gutterBottom variant="h6" component="div">
          <Skeleton />
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: '8px 16px' }}>
        <Typography height="30.75px">
          <Skeleton width="70px" />
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CourseCardSkeleton;
