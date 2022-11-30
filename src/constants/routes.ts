import { FC } from 'react';

import { Home, School, People } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

import { HomePage, TeachersPage, StudentsPage } from 'pages';

interface Route {
  name: string;
  path: string;
  page: FC;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  roles?: string[];
}

const ROUTES: Route[] = [
  {
    name: 'Главная',
    path: '/',
    page: HomePage,
    icon: Home
  },
  {
    name: 'Преподаватели',
    path: '/teachers',
    page: TeachersPage,
    icon: School,
    roles: ['admin']
  },
  {
    name: 'Студенты',
    path: '/students',
    page: StudentsPage,
    icon: People,
    roles: ['admin', 'teacher']
  }
];

export default ROUTES;
