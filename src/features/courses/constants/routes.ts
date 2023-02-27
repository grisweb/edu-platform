import { ToplevelRoute } from 'interfaces/routes';
import { LocalLibrary } from '@mui/icons-material';

import {
  CoursesPage,
  AddCoursePage,
  CoursePage,
  EditCoursePage,
  AddLecturePage,
  LecturePage
} from '../pages';

const routes: ToplevelRoute[] = [
  {
    title: 'Курсы',
    path: '/courses',
    page: CoursesPage,
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
    title: 'Редактировать курс',
    path: 'courses/edit/:id',
    page: EditCoursePage,
    roles: ['admin', 'teacher']
  },
  {
    title: 'Курс',
    path: 'courses/:id',
    page: CoursePage
  },
  {
    title: 'Создать лекцию',
    path: 'modules/:id/lectures/add',
    page: AddLecturePage,
    roles: ['admin', 'teacher']
  },
  {
    title: 'Лекция',
    path: '/lectures/:id',
    page: LecturePage,
    roles: ['admin', 'teacher']
  }
];

export default routes;
