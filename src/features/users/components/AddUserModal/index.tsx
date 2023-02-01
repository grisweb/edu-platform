import { FC, FormEventHandler, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography
} from '@mui/material';

import {
  useAutocompleteQuery,
  useAddUsersMutation
} from 'store/services/userApi';

import { useSnackbar } from 'notistack';
import { useDebounce } from 'hooks';
import { User, MsUser } from 'interfaces/user';

interface AddUserModalProps {
  open: boolean;
  handleClose: () => void;
  role: User['role'];
}

const AddUserModal: FC<AddUserModalProps> = ({ open, handleClose, role }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<MsUser[]>([]);

  const debouncedQuery = useDebounce(query, 400);

  const { data, isFetching } = useAutocompleteQuery(debouncedQuery, {
    skip: !debouncedQuery
  });

  const [createUsers, { isLoading }] = useAddUsersMutation();

  useEffect(() => {
    if (data) {
      setOptions(data);
    } else {
      setOptions([]);
    }
  }, [data]);

  const [selectedUsers, setSelectedUsers] = useState<MsUser[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit: FormEventHandler = async (evt) => {
    evt.preventDefault();

    try {
      await createUsers({ users: selectedUsers, role }).unwrap();
      handleClose();
      enqueueSnackbar('Новые пользователи добавлены успешно!', {
        variant: 'success'
      });
    } catch {
      enqueueSnackbar('Ошибка добавления новых пользователей!', {
        variant: 'error'
      });
    }
  };

  return (
    <Dialog fullWidth open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          Добавить {role === 'teacher' ? 'преподавателей' : 'студентов'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Выберете нужных пользователей ЮФУ
          </DialogContentText>
          <Autocomplete
            sx={{ marginTop: '20px' }}
            multiple
            filterOptions={(x) => x}
            filterSelectedOptions
            loading={isFetching}
            autoComplete
            options={options}
            onChange={(_evt, val) => {
              setSelectedUsers(val);
            }}
            disableListWrap={!query}
            noOptionsText="Пользователи не найдены"
            getOptionLabel={(option) => option.displayName}
            loadingText="Загрузка..."
            onInputChange={(_evt, newInputValue) => {
              setQuery(newInputValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Введите ФИО или email"
                fullWidth
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isFetching ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" marginRight="8px">
                    {option.displayName}
                  </Typography>
                  <Typography variant="body2">({option.mail})</Typography>
                </Box>
              </li>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit" disabled={isLoading || !options}>
            Добавить
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserModal;
