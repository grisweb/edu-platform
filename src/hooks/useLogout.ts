import { useMsal } from '@azure/msal-react';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/authSlice';

const useLogout = () => {
  const { instance, accounts } = useMsal();

  const dispatch = useAppDispatch();

  return async () => {
    try {
      await instance.logoutRedirect({
        account: accounts[0],
        onRedirectNavigate: () => false
      });

      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
};

export default useLogout;
