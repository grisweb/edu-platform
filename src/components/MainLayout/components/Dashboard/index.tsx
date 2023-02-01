import { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Box
} from '@mui/material';

import { useAppSelector } from 'store/hooks';

import ROUTES from 'constants/routes';
import { roles as userRoles } from 'constants/user';

import { AppBar, Drawer, DrawerHeader } from './components';

const Dashboard: FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavClick = (path: string) => () => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#E7EBF0',
        height: '100%',
        minHeight: '100vh'
      }}
    >
      <CssBaseline />
      <AppBar open={open} onOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {ROUTES.map(
            ({ title, path, isMenu = false, icon: Icon, roles = userRoles }) =>
              isMenu &&
              Icon &&
              user &&
              roles?.includes(user.role) && (
                <ListItem key={title} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5
                    }}
                    onClick={handleNavClick(path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <>
          <DrawerHeader />
          <Outlet />
        </>
      </Box>
    </Box>
  );
};

export default Dashboard;
