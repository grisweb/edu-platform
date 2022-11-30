import baseApi from 'store/baseApi';
import { User } from 'interfaces/user';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<User[], void>({
      query: () => ({
        url: '/users?role=teacher'
      })
    })
  })
});

export const { useGetTeachersQuery } = userApi;
export default userApi;
