import { FC, useState, MouseEvent } from 'react';

import { styled } from '@mui/material/styles';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar/AppBar';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Tooltip,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';

import { useAppSelector } from 'store/hooks';
import { useLogout } from 'hooks';

interface StyledAppBarProps extends MuiAppBarProps {
  open: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<StyledAppBarProps>(({ theme: { transitions, zIndex, options }, open }) => ({
  zIndex: zIndex.drawer + 1,
  transition: transitions.create(['width', 'margin'], {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: options.drawerWidth,
    width: `calc(100% - ${options.drawerWidth}px)`,
    transition: transitions.create(['width', 'margin'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen
    })
  })
}));

interface AppBarProps {
  open: boolean;
  onOpen: () => void;
}

const AppBar: FC<AppBarProps> = ({ open, onOpen }) => {
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = useLogout();

  const settings = [
    { title: 'Profile', onClick: handleCloseUserMenu },
    { title: 'Logout', onClick: () => logout() }
  ];

  const { user } = useAppSelector((state) => state.auth);

  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' })
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" flexGrow={1}>
          Edu Platform
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{ marginRight: '10px' }}
            align="right"
            variant="body2"
          >
            {user?.name}
            <br />
            {user?.email}
          </Typography>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              color="inherit"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              // sx={{ p: 0 }}
            >
              <Avatar sx={{ backgroundColor: '#416660' }}>
                {user?.name.split(' ')[0][0]}
                {user?.name.split(' ')[1][0]}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '40px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map(({ title, onClick }) => (
              <MenuItem key={title} onClick={onClick}>
                <Typography textAlign="center">{title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};
export default AppBar;
