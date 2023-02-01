import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useGetUserQuery } from 'store/services/authApi';

interface RequireRoleProps {
  roles?: string[];
}

const RequireRole: FC<RequireRoleProps> = ({
  roles = ['student', 'teacher', 'admin']
}) => {
  const { data: user } = useGetUserQuery(null);

  return roles.includes(user?.role ? user.role : '') ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default RequireRole;
