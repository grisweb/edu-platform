import baseApi from 'store/baseApi';
import { MsUser, User, UsersRequest, UsersResponse } from 'interfaces/user';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, UsersRequest>({
      query: ({ page, perPage, search, role }) => ({
        url: '/users',
        params: {
          role,
          page,
          perPage,
          search
        }
      }),
      providesTags: (result) =>
        result?.users
          ? [
              ...result.users.map(({ id }) => ({
                type: 'Users' as const,
                id
              })),
              { type: 'Users', id: 'LIST' }
            ]
          : [{ type: 'Users', id: 'LIST' }]
    }),
    autocomplete: builder.query<MsUser[], string>({
      query: (query: string) => ({
        url: `/users/autocomplete`,
        params: {
          q: query
        }
      })
    }),
    addUsers: builder.mutation<User[], { users: MsUser[]; role: User['role'] }>(
      {
        query: ({ users, role }) => ({
          url: '/users',
          method: 'POST',
          body: {
            users: [...users.map((user) => user.id)],
            role
          }
        }),
        invalidatesTags: [{ type: 'Users', id: 'LIST' }]
      }
    ),
    deleteUser: builder.mutation<{ data: User }, User['id']>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Users', id }]
    })
  })
});

export const {
  useGetUsersQuery,
  useAutocompleteQuery,
  useAddUsersMutation,
  useDeleteUserMutation
} = userApi;
export default userApi;
