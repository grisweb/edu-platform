import { FC } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

interface ConfirmActionDialogProps {
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  handleAgreement: () => void;
  question: string;
}

const ConfirmActionDialog: FC<ConfirmActionDialogProps> = ({
  isLoading,
  open,
  handleClose,
  handleAgreement,
  question
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Подтвердите действие</DialogTitle>
      <DialogContent>
        <DialogContentText>{question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Отмена
        </Button>
        <Button disabled={isLoading} onClick={handleAgreement}>
          Ок
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;
