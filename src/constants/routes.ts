import { Home } from '@mui/icons-material';
import { ToplevelRoute } from 'interfaces/routes';
import { HomePage } from 'pages';

import userPages from 'features/users/constants/routes';
import coursePages from 'features/courses/constants/routes';

const ROUTES: ToplevelRoute[] = [
  {
    title: 'Главная',
    path: '/',
    page: HomePage,
    isMenu: true,
    icon: Home
  },
  ...coursePages,
  ...userPages
];

export default ROUTES;
