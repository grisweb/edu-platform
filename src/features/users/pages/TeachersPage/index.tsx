import { FC } from 'react';

import PageTitle from 'components/ui/PageTitle';
import UsersCrudTable from 'features/users/components/UsersCrudTable';

const TeachersPage: FC = () => (
  <>
    <PageTitle title="Преподаватели" />
    <UsersCrudTable userRole="teacher" />
  </>
);
export default TeachersPage;
