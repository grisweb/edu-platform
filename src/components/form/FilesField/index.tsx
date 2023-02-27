import { FC } from 'react';
// import { useDropzone } from 'react-dropzone';
//
// import { ImageBox } from 'components/ui';
// import { File } from 'interfaces/base';

const FilesField: FC = () => {
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // const [loadingFiles, setLoadingFiles] = useState<File[]>([]);
  //
  // const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
  //   useDropzone({
  //     multiple: false,
  //     onDrop: async (acceptedFiles) => {
  //       const newFiles = acceptedFiles.map(({ name }) => ({ name }));
  //       setSelectedFiles((prevState) => [...prevState, ...newFiles]);
  //
  //       try {
  //         const formData = new FormData();
  //         formData.append('image', acceptedFiles[0]);
  //
  //         setIsSubmitting(true);
  //         const image = await addImage(formData).unwrap();
  //         field.onChange(image.id);
  //         setIsSubmitting(false);
  //         setPreviewFile(image.path);
  //       } catch {
  //         enqueueSnackbar('Ошибка загрузки изображения!', { variant: 'error' });
  //         setPreviewFile(null);
  //       }
  //     }
  //   });

  return <div />;
};

export default FilesField;
