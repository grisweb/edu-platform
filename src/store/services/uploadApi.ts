import baseApi from 'store/baseApi';

interface Image {
  id: string;
  path: string;
}

const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addImage: builder.mutation<Image, FormData>({
      query: (data) => ({
        url: '/uploads/images',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useAddImageMutation } = uploadApi;
export default uploadApi;
