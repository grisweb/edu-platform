import { AppRoute } from 'interfaces/routes';
import { LocalLibrary } from '@mui/icons-material';

import { CoursesPage } from '../pages';

const routes: AppRoute[] = [
  {
    title: 'Курсы',
    path: '/courses',
    page: CoursesPage,
    roles: ['teacher', 'student'],
    icon: LocalLibrary,
    isMenu: true
  }
];

export default routes;
