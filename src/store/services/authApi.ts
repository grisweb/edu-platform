import baseApi from 'store/baseApi';
import { setUser } from 'store/slices/authSlice';
import { User } from 'interfaces/user';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query: () => ({
        url: '/users/me'
      }),
      transformResponse: (result: User) => result,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      }
    })
  })
});

export const { useGetUserQuery } = authApi;
export default authApi;
