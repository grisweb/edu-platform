import { FC, useMemo, useState, useCallback } from 'react';
import { Box, Button, Tooltip, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_Row
} from 'material-react-table';

import type { PaginationState } from '@tanstack/react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import AddUserModal from 'features/users/components/AddUserModal';
import DeleteUserAlert from 'features/users/components/DeleteUserAlert';

import {
  useGetUsersQuery,
  useDeleteUserMutation
} from 'store/services/userApi';

import { User } from 'interfaces/user';

interface UsersCrudTableProps {
  userRole: Exclude<User['role'], 'admin'>;
}

const UsersCrudTable: FC<UsersCrudTableProps> = ({ userRole }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const { data, error, isLoading, isFetching } = useGetUsersQuery({
    role: userRole,
    page: pagination.pageIndex + 1,
    perPage: pagination.pageSize,
    search: globalFilter
  });

  const [deleteUser, { isLoading: deleteIsLoading }] = useDeleteUserMutation();

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'ФИО'
      },
      {
        accessorKey: 'email',
        header: 'Email'
      }
    ],
    []
  );

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deletedUser, setDeletedUser] = useState<number | null>(null);

  const handleDeleteRow = useCallback((row: MRT_Row<User>) => {
    setDeletedUser(row.original.id);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteUser = async () => {
    if (deletedUser) {
      try {
        await deleteUser(deletedUser).unwrap();
        enqueueSnackbar('Пользователь удален успешно!', {
          variant: 'success'
        });
      } catch {
        enqueueSnackbar('Ошибка удаления пользователя!', {
          variant: 'error'
        });
      }
    }

    setDeletedUser(null);
  };

  const handleCloseDeleteAlert = () => {
    setDeletedUser(null);
  };

  return (
    <>
      <MaterialReactTable
        localization={MRT_Localization_RU}
        muiTablePaginationProps={{
          labelRowsPerPage: 'Пользователей на странице:'
        }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed'
          }
        }}
        columns={columns}
        data={data?.users || []}
        muiToolbarAlertBannerProps={
          error
            ? {
                color: 'error',
                children: 'Ошибка загрузки данных'
              }
            : undefined
        }
        renderTopToolbarCustomActions={() => (
          <Button onClick={handleOpen} variant="text">
            Добавить пользователя
          </Button>
        )}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: ''
          }
        }}
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'right' }}>
            <Tooltip arrow placement="right" title="Удалить">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        enableColumnActions={false}
        enableRowActions
        enableColumnFilters={false}
        enableSorting={false}
        enableDensityToggle={false}
        enableHiding={false}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        manualPagination
        rowCount={data?.pagination.total}
        state={{
          isLoading,
          pagination,
          globalFilter,
          showProgressBars: isFetching
        }}
      />
      <AddUserModal open={open} role={userRole} handleClose={handleClose} />
      <DeleteUserAlert
        isLoading={deleteIsLoading}
        open={!!deletedUser}
        handleClose={handleCloseDeleteAlert}
        handleAgreement={handleDeleteUser}
      />
    </>
  );
};

export default UsersCrudTable;
