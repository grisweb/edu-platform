import { FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import { useAppDispatch } from 'store/hooks';
import { ErrorMessage, ImageBox } from 'components/ui';
import { useAddImageMutation } from 'store/services/uploadApi';
import { setDisabled } from 'store/slices/formSlice';

interface TextFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

const ImageField: FC<TextFieldProps> = ({ name, label, required = false }) => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDisabled(isSubmitting));
  }, [dispatch, isSubmitting]);

  const [addImage] = useAddImageMutation();

  const { control } = useFormContext();

  const { fieldState, field } = useController({
    name,
    control,
    rules: {
      required: required ? 'Это значение является обязательным' : undefined
    },
    defaultValue: null
  });

  useEffect(() => {
    if (field.value && typeof field.value !== 'string') {
      setPreviewFile(field.value.url as string);
      field.onChange(field.value.id as string);
    }
  }, [field]);

  const { enqueueSnackbar } = useSnackbar();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': []
      },
      multiple: false,
      onDrop: async (acceptedFiles) => {
        setPreviewFile(URL.createObjectURL(acceptedFiles[0]));

        try {
          const formData = new FormData();
          formData.append('image', acceptedFiles[0]);

          setIsSubmitting(true);
          const image = await addImage(formData).unwrap();
          field.onChange(image.id);
          setIsSubmitting(false);
          setPreviewFile(image.path);
        } catch {
          enqueueSnackbar('Ошибка загрузки изображения!', { variant: 'error' });
          setPreviewFile(null);
        }
      }
    });

  return (
    <Box width="100%">
      <Typography marginBottom="10px">{label}</Typography>
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
            <Typography variant="body1">
              Перетащите изображение в эту область
            </Typography>
          </>
        )}
      </ImageBox>
      <ErrorMessage error={fieldState.error} />
    </Box>
  );
};

export default ImageField;
