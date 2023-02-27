import baseApi from 'store/baseApi';
import {
  Module,
  Course,
  CoursesRequest,
  CoursesResponse,
  AddCourseRequest,
  AddModuleRequest,
  EditCourseRequest,
  EditModuleRequest
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
        url: `/courses/${id}`
      }),
      providesTags: (result, _error, courseId) =>
        result?.modules
          ? [
              ...result.modules.map(({ id }) => ({
                type: 'Modules' as const,
                id
              })),
              { type: 'Modules', id: 'LIST' },
              { type: 'Courses', id: courseId }
            ]
          : [
              { type: 'Modules', id: 'LIST' },
              { type: 'Courses', id: courseId }
            ]
    }),
    addCourse: builder.mutation<Course, AddCourseRequest>({
      query: (data) => ({
        url: '/courses',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'Courses', id: 'LIST' }]
    }),
    updateCourse: builder.mutation<Course, EditCourseRequest>({
      query: ({ id, course }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: course
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Courses', id }]
    }),
    deleteCourse: builder.mutation<Course, Course['id']>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Courses', id }]
    }),
    addModule: builder.mutation<Module, AddModuleRequest>({
      query: (body) => ({
        url: '/modules',
        body,
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'Modules', id: 'LIST' }]
    }),
    updateModule: builder.mutation<Module, EditModuleRequest>({
      query: ({ id, ...body }) => ({
        url: `/modules/${id}`,
        body,
        method: 'PUT'
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Modules', id }]
    }),
    deleteModule: builder.mutation<Module, Module['id']>({
      query: (id) => ({
        url: `/modules/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Modules', id }]
    })
  })
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useAddModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation
} = courseApi;
export default courseApi;
