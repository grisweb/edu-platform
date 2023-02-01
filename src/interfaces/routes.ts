import { FC } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

import { User } from './user';

interface Route {
  title: string;
  path: string;
  page: FC;
  roles?: User['role'][];
  children?: Route[];
}

interface BaseRoute extends Route {
  isMenu?: false;
  icon?: null;
}

interface WithMenuLinkRoute extends Route {
  isMenu: true;
  icon: OverridableComponent<SvgIconTypeMap>;
}

type AppRoute = WithMenuLinkRoute | BaseRoute;

export type { AppRoute };
