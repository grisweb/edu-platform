import baseApi from 'store/baseApi';
import {
  AddCourseRequest,
  Course,
  CoursesRequest,
  CoursesResponse
} from 'interfaces/courses';

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<CoursesResponse, CoursesRequest>({
      query: (params) => ({
        url: '/courses',
        params
      }),
      providesTags: (result) =>
        result?.courses
          ? [
              ...result.courses.map(({ id }) => ({
                type: 'Courses' as const,
                id
              })),
              { type: 'Courses', id: 'LIST' }
            ]
          : [{ type: 'Courses', id: 'LIST' }]
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => ({
        url: `courses/${id}`
      })
    }),
    addCourse: builder.mutation<Course, AddCourseRequest>({
      query: (data) => ({
        url: '/courses',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'Courses', id: 'LIST' }]
    }),
    deleteCourse: builder.mutation<Course, Course['id']>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Courses', id }]
    })
  })
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useDeleteCourseMutation
} = courseApi;
export default courseApi;
