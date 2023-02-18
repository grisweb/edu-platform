import { ToplevelRoute } from 'interfaces/routes';
import { People, School } from '@mui/icons-material';

import { TeachersPage, StudentsPage } from '../pages';

const routes: ToplevelRoute[] = [
  {
    title: 'Преподаватели',
    path: '/teachers',
    page: TeachersPage,
    roles: ['admin'],
    isMenu: true,
    icon: School
  },
  {
    title: 'Студенты',
    path: '/students',
    page: StudentsPage,
    roles: ['admin', 'teacher'],
    isMenu: true,
    icon: People
  }
];

export default routes;
