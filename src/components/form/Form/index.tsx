import { FC, PropsWithChildren } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { Stack } from '@mui/material';
import { pickBy } from 'lodash';

interface FormProps extends PropsWithChildren {
  onSubmit: (data: any) => void;
}

const Form: FC<FormProps> = ({ onSubmit, children }) => {
  const { formState, ...methods } = useForm();

  const handleSubmit = (data: FieldValues) => {
    const sanitizedData = pickBy(data, (value) => value.length > 0);
    onSubmit(sanitizedData);
  };

  return (
    <FormProvider {...methods} formState={formState}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        <Stack spacing={4} alignItems="flex-start" width={{ xs: '45%' }}>
          {children}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default Form;
