import { FC } from 'react';
import { Button } from '@mui/material';
import { useAppSelector } from 'store/hooks';

interface SubmitButtonProps {
  disabled: boolean;
  text: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ disabled, text }) => {
  const formDisabled = useAppSelector((state) => state.form.disabled);

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled || formDisabled}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
