import { Home } from '@mui/icons-material';
import { AppRoute } from 'interfaces/routes';
import { HomePage } from 'pages';

import userPages from 'features/users/constants/routes';
import coursePages from 'features/courses/constants/routes';

const ROUTES: AppRoute[] = [
  {
    title: 'Главная',
    path: '/',
    page: HomePage,
    isMenu: true,
    icon: Home
  },
  ...userPages,
  ...coursePages
];

export default ROUTES;
