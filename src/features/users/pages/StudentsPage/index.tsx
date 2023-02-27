import { FC } from 'react';

import PageTitle from 'components/ui/PageTitle';
import UsersCrudTable from 'features/users/components/UsersCrudTable';

const TeachersPage: FC = () => (
  <>
    <PageTitle title="Студенты" />
    <UsersCrudTable userRole="student" />
  </>
);
export default TeachersPage;
