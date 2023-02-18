import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

import { ImageBox } from 'components/ui';
import { useAddImageMutation } from 'store/services/uploadApi';

const ImageField: FC = () => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [, setFile] = useState<string | null>(null);

  const [addImage] = useAddImageMutation();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': []
      },
      multiple: false,
      onDrop: async (acceptedFiles) => {
        setPreviewFile(URL.createObjectURL(acceptedFiles[0]));

        const formData = new FormData();

        try {
          formData.append('image', acceptedFiles[0]);
          const image = await addImage(formData).unwrap();
          setFile(image.id);
          setPreviewFile(image.path);
        } catch {
          /* empty */
        }
      }
    });

  return (
    <ImageBox {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      {previewFile ? (
        <Box
          component="img"
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={previewFile}
          alt="Course image"
        />
      ) : (
        <>
          <input {...getInputProps()} />
          <Typography>Перетащите изображение в это область</Typography>
        </>
      )}
    </ImageBox>
  );
};

export default ImageField;
