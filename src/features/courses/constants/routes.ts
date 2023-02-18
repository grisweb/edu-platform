import { ToplevelRoute } from 'interfaces/routes';
import { LocalLibrary } from '@mui/icons-material';

import { CoursesPage, AddCoursePage, CoursePage } from '../pages';

const routes: ToplevelRoute[] = [
  {
    title: 'Курсы',
    path: '/courses',
    page: CoursesPage,
    // roles: ['teacher', 'student'],
    icon: LocalLibrary,
    isMenu: true
  },
  {
    title: 'Добавить курс',
    path: 'courses/add',
    page: AddCoursePage,
    roles: ['admin', 'teacher']
  },
  {
    title: 'Курс',
    path: 'courses/:id',
    page: CoursePage
  }
];

export default routes;
