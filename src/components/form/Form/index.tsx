import { FC, PropsWithChildren, useEffect } from 'react';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { Stack } from '@mui/material';
import { pickBy } from 'lodash';

interface FormProps extends PropsWithChildren {
  onSubmit: (data: any) => void;
  withStack?: boolean;
  edit?: boolean;
  values?: FieldValues;
}

const Form: FC<FormProps> = ({
  onSubmit,
  children,
  withStack = true,
  edit = false,
  values
}) => {
  const { reset, ...methods } = useForm();

  useEffect(() => {
    if (values) {
      reset(values);
    }
  }, [reset, values]);

  const handleSubmit = (data: FieldValues) => {
    const submittedData = edit
      ? data
      : pickBy(data, (value) => value && value.length > 0);
    onSubmit(submittedData);
  };

  return (
    <FormProvider {...methods} reset={reset}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        {withStack ? (
          <Stack spacing={4} alignItems="flex-start" width={{ xs: '45%' }}>
            {children}
          </Stack>
        ) : (
          children
        )}
      </form>
    </FormProvider>
  );
};

export default Form;
