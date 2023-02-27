import { FC, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Stack,
  ClickAwayListener
} from '@mui/material';
import { MoreVert, Class } from '@mui/icons-material';

import { ActionButton, Paper } from 'components/ui';
import { Module } from 'interfaces/courses';

import EditModuleName from '../EditModuleName';
import DeleteModule from '../DeleteModule';

const ModuleCard: FC<Module> = ({ id, name, lectures }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const [isOpenChange, setIsOpenChange] = useState(false);

  const handleClick = (evt: MouseEvent<HTMLElement>) => {
    setAnchorEl(evt.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNameChange = () => {
    setIsOpenChange(false);
  };

  const handleClickChange = () => {
    setIsOpenChange(true);
    setAnchorEl(null);
  };

  return (
    <Paper>
      <Stack
        paddingBottom="10px"
        borderBottom="1px solid"
        borderColor={({ colors }) => colors.border}
        direction="row"
        spacing={1}
        alignItems="center"
      >
        {isOpenChange ? (
          <ClickAwayListener onClickAway={handleNameChange}>
            <Box sx={{ position: 'relative' }}>
              <EditModuleName
                name={name}
                id={id}
                onSubmitted={handleNameChange}
              />
            </Box>
          </ClickAwayListener>
        ) : (
          <Typography variant="h6">{name}</Typography>
        )}

        <IconButton size="small" onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem key="1" component={Link} to={`/modules/${id}/lectures/add`}>
            Добавить лекцию
          </MenuItem>
          <MenuItem key="2" onClick={handleClickChange}>
            Изменить название
          </MenuItem>
          <DeleteModule onClick={handleClose} id={id} />
        </Menu>
      </Stack>
      <Stack marginTop="10px" alignItems="flex-start">
        {lectures.length > 0 ? (
          lectures.map(({ id: lectureId, name: lectureName }) => (
            <ActionButton
              key={lectureId}
              text={lectureName}
              icon={Class}
              MuiButtonProps={{
                size: 'small',
                component: Link,
                to: `/lectures/${lectureId}`
              }}
            />
          ))
        ) : (
          <Typography color="gray">Лекции отсутствуют</Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default ModuleCard;
