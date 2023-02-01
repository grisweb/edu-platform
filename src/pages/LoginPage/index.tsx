import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useMsal } from '@azure/msal-react';

import { useAppSelector } from 'store/hooks';
import { useGetUserQuery } from 'store/services/authApi';

import FullScreenLoader from 'components/FullScreenLoader';

const LoginPage: FC = () => {
  const { instance } = useMsal();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || '/';

  const { user } = useAppSelector((state) => state.auth);
  const { msToken } = useAppSelector((state) => state.auth);

  const { isLoading } = useGetUserQuery(null, {
    skip: !msToken || !!user
  });

  const [email, setEmail] = useState('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit: FormEventHandler = async () => {
    try {
      await instance.loginRedirect({
        loginHint: email,
        scopes: ['mail.send', 'user.read', 'User.ReadBasic.All']
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (user) {
    return <Navigate to={from} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField value={email} onChange={handleChange} />
      <Button type="submit">Войти с учетной записью ЮФУ</Button>
    </form>
  );
};

export default LoginPage;
