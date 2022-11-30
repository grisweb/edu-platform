import { FC } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  // TablePagination,
  TableRow,
  Toolbar,
  Checkbox
  // IconButton,
  // FormControlLabel
} from '@mui/material';
// import { Delete } from '@mui/icons-material';

import { useGetTeachersQuery } from 'store/services/userApi';

const TeachersPage: FC = () => {
  const { data: users } = useGetTeachersQuery();

  // const [numSelected, setNumSelected] = useState(0);
  //
  // const [selected, setSelected] = useState<string[]>([]);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <>
      <Typography variant="h5">Преподаватели</Typography>
      <Paper
        variant="outlined"
        sx={{
          backgroundColor: 'white',
          marginTop: '15px',
          padding: '20px 10px'
        }}
      >
        <Toolbar>
          <Typography variant="h6">Список</Typography>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Почта</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map(({ name, email }) => {
                const isItemSelected = isSelected(name);

                return (
                  <TableRow hover role="checkbox" selected={isItemSelected}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TeachersPage;
