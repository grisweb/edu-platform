import { FC, useState } from 'react';
import { MenuItem } from '@mui/material';

import { useDeleteModuleMutation } from 'store/services/courseApi';
import ConfirmActionDialog from 'components/ConfirmActionDialog';
import { useSnackbar } from 'notistack';

interface DeleteModuleProps {
  id: string;
  onClick: () => void;
}

const DeleteModule: FC<DeleteModuleProps> = ({ id, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { enqueueSnackbar } = useSnackbar();
  const [deleteModule, { isLoading }] = useDeleteModuleMutation();

  const handleSubmit = async () => {
    try {
      await deleteModule(id);
      setOpen(false);
      onClick();
    } catch {
      enqueueSnackbar('Ошибка удаления модуля!', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Удалить модуль</MenuItem>
      <ConfirmActionDialog
        question="Вы действительно хотите удалить данный модуль?"
        open={open}
        handleClose={handleClose}
        handleAgreement={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default DeleteModule;
