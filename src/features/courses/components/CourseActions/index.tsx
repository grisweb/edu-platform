import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import { useDeleteCourseMutation } from 'store/services/courseApi';

import { ActionButton } from 'components/ui';
import ConfirmActionDialog from 'components/ConfirmActionDialog';

interface CourseActionsProps {
  id: string;
}

const CourseActions: FC<CourseActionsProps> = ({ id }) => {
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(id);
      enqueueSnackbar('Курс удален успешно!', {
        variant: 'success'
      });
      handleClose();
      navigate('/courses');
    } catch {
      enqueueSnackbar('Ошибка удаления пользователя!', {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Stack marginLeft="auto" direction="row" spacing={2}>
        <ActionButton
          MuiButtonProps={{
            component: Link,
            to: `/courses/edit/${id}`
          }}
          text="Редактировать"
          icon={Edit}
        />
        <ActionButton
          onClick={handleOpen}
          MuiButtonProps={{
            color: 'error'
          }}
          text="Удалить"
          icon={Delete}
        />
      </Stack>
      <ConfirmActionDialog
        open={open}
        isLoading={isLoading}
        handleAgreement={handleDelete}
        handleClose={handleClose}
        question="Вы действительно хотите удалить данный курс"
      />
    </>
  );
};

export default CourseActions;
