import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

interface RequireRoleProps {
  roles?: string[];
}

const RequireRole: FC<RequireRoleProps> = ({
  roles = ['student', 'teacher', 'admin']
}) => {
  const { user } = useAppSelector((state) => state.auth);

  return roles.includes(user?.role ? user.role : '') ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default RequireRole;
