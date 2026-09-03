import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  Typography,
  Badge,
  Box,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { sessionActions } from '../../store';
import { useTranslation } from './LocalizationProvider';
import { useRestriction } from '../util/permissions';
import { nativePostMessage } from './NativeInterface';

const useStyles = makeStyles()((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    borderRadius: 0,
  },
  bottomNav: {
    backgroundColor: theme.palette.background.paper,
    height: 64,
    '& .MuiBottomNavigationAction-root': {
      minWidth: 'auto',
      padding: '6px 6px 6px',
      color: '#868685',
      gap: 4,
      flex: 1,
      maxWidth: 'none',
      '&.Mui-selected': {
        color: '#0e0f0c',
      },
    },
    '& .MuiBottomNavigationAction-label': {
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '0.3px',
      textTransform: 'uppercase',
      '&.Mui-selected': {
        fontSize: '10px',
        color: '#0e0f0c',
      },
    },
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 180ms ease',
  },
  iconBoxSelected: {
    backgroundColor: '#9fe870',
    color: '#0e0f0c',
  },
  iconBoxDefault: {
    backgroundColor: 'transparent',
    color: '#868685',
  },
  menuItem: {
    borderRadius: 12,
    margin: '2px 4px',
    '&:hover': {
      backgroundColor: '#e8ebe6',
    },
  },
}));

const NavIcon = ({ children, selected, badge }) => {
  const { classes } = useStyles();
  const content = (
    <Box className={`${classes.iconBox} ${selected ? classes.iconBoxSelected : classes.iconBoxDefault}`}>
      {children}
    </Box>
  );
  if (badge !== undefined) return <Badge color="error" variant="dot" overlap="circular" invisible={badge}>{content}</Badge>;
  return content;
};

const BottomMenu = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const t = useTranslation();

  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const devices = useSelector((state) => state.devices.items);
  const user = useSelector((state) => state.session.user);
  const socket = useSelector((state) => state.session.socket);
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);

  const [anchorEl, setAnchorEl] = useState(null);

  const currentSelection = () => {
    if (location.pathname === `/settings/user/${user.id}`) {
      return 'account';
    }
    if (location.pathname.startsWith('/settings')) {
      return 'settings';
    }
    if (location.pathname.startsWith('/reports')) {
      return 'reports';
    }
    if (location.pathname === '/') {
      return 'map';
    }
    return null;
  };
  const sel = currentSelection();

  const handleAccount = () => {
    setAnchorEl(null);
    navigate(`/settings/user/${user.id}`);
  };

  const handleLogout = async () => {
    setAnchorEl(null);

    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken && !user.readonly) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens:
              tokens.length > 1
                ? tokens.filter((it) => it !== notificationToken).join(',')
                : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  const handleSelection = (event, value) => {
    switch (value) {
      case 'map':
        navigate('/');
        break;
      case 'reports': {
        let id = selectedDeviceId;
        if (id == null) {
          const deviceIds = Object.keys(devices);
          if (deviceIds.length === 1) {
            id = deviceIds[0];
          }
        }

        if (id != null) {
          navigate(`/reports/combined?deviceId=${id}`);
        } else {
          navigate('/reports/combined');
        }
        break;
      }
      case 'settings':
        navigate('/settings/preferences?menu=true');
        break;
      case 'account':
        setAnchorEl(event.currentTarget);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <Paper square className={classes.paper}>
      <BottomNavigation
        value={sel}
        onChange={handleSelection}
        showLabels
        className={classes.bottomNav}
      >
        <BottomNavigationAction
          label={t('mapTitle')}
          icon={<NavIcon selected={sel === 'map'} badge={socket !== false}><MapIcon sx={{ fontSize: 18 }} /></NavIcon>}
          value="map"
        />
        {!disableReports && (
          <BottomNavigationAction
            label={t('reportTitle')}
            icon={<NavIcon selected={sel === 'reports'}><DescriptionIcon sx={{ fontSize: 18 }} /></NavIcon>}
            value="reports"
          />
        )}
        {!readonly && (
          <BottomNavigationAction
            label={t('settingsTitle')}
            icon={<NavIcon selected={sel === 'settings'}><SettingsIcon sx={{ fontSize: 18 }} /></NavIcon>}
            value="settings"
          />
        )}
        {readonly ? (
          <BottomNavigationAction
            label={t('loginLogout')}
            icon={<NavIcon selected={sel === 'logout'}><ExitToAppIcon sx={{ fontSize: 18 }} /></NavIcon>}
            value="logout"
          />
        ) : (
          <BottomNavigationAction label={t('settingsUser')} icon={<NavIcon selected={sel === 'account'}><PersonIcon sx={{ fontSize: 18 }} /></NavIcon>} value="account" />
        )}
      </BottomNavigation>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              border: '1px solid rgba(14,15,12,0.08)',
              boxShadow: '0 8px 24px rgba(14,15,12,0.12)',
              mt: 1,
            },
          },
        }}
      >
        <MenuItem className={classes.menuItem} onClick={handleAccount}>
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{t('settingsUser')}</Typography>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          <Typography color="error" sx={{ fontWeight: 600, fontSize: 14 }}>{t('loginLogout')}</Typography>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default BottomMenu;
