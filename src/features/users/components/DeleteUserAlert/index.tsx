import { FC } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

interface DeleteUserAlertProps {
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  handleAgreement: () => void;
}

const DeleteUserAlert: FC<DeleteUserAlertProps> = ({
  isLoading,
  open,
  handleClose,
  handleAgreement
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Подтвердите действие</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите удалить данного пользователя?
        </DialogContentText>
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

export default DeleteUserAlert;
