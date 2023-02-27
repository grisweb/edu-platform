import baseApi from 'store/baseApi';
import { AddLectureRequest, Lecture } from 'interfaces/courses';

const lectureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLecture: builder.query<Lecture, string>({
      query: (id) => ({
        url: `/lectures/${id}`
      }),
      providesTags: (result, _error, lectureId) => [
        { type: 'Lectures', id: lectureId }
      ]
    }),
    addLecture: builder.mutation<Lecture, AddLectureRequest>({
      query: (data) => ({
        url: '/lectures',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [{ type: 'Lectures', id: 'LIST' }]
    })
  })
});

export const { useGetLectureQuery, useAddLectureMutation } = lectureApi;
export default lectureApi;
