import { FC, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useController, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';

import { ErrorMessage } from 'components/ui';
import { useAddImageMutation } from 'store/services/uploadApi';

import { init, toolbar } from './constants';

interface TextFieldProps {
  name: string;
  label: string;
  required?: boolean;
}

const EditorField: FC<TextFieldProps> = ({ name, label, required = false }) => {
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
    if (field.value === '') {
      field.onChange(null);
    }
  }, [field]);

  const [addImage] = useAddImageMutation();

  return (
    <Box width="100%">
      <Typography marginBottom="10px">{label}</Typography>
      <Editor
        apiKey={process.env.REACT_APP_TINY_API_KEY}
        value={field.value}
        onEditorChange={field.onChange}
        toolbar={toolbar}
        init={{
          ...init,
          images_upload_handler: async (blobInfo) => {
            const formData = new FormData();
            formData.append('image', blobInfo.blob(), blobInfo.filename());
            const { path } = await addImage(formData).unwrap();
            return path;
          }
        }}
      />
      <ErrorMessage error={fieldState.error} />
    </Box>
  );
};

export default EditorField;
