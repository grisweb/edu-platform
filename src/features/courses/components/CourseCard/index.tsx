import { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Tooltip
} from '@mui/material';

import { Course } from 'interfaces/courses';

import placeholder from '../../assets/images/no-image.webp';

interface CourseCardProps {
  course: Course;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          height: 'auto',
          aspectRatio: '16 / 9'
        }}
        width="800px"
        height="450px"
        loading="lazy"
        alt={course.name}
        image={course.image?.url || placeholder}
      />
      <CardContent
        sx={{
          padding: '12px 16px 0'
        }}
      >
        <Tooltip
          title={course.name}
          placement="bottom-start"
          enterDelay={1500}
          followCursor
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: '1'
            }}
          >
            {course.name}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions sx={{ padding: '8px 11px' }}>
        <Button component={Link} to={`/courses/${course.id}`} size="small">
          Перейти
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
