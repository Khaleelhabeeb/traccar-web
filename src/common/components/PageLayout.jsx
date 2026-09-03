import { useState } from 'react';
import {
  AppBar,
  Breadcrumbs,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
  Box,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from './LocalizationProvider';
import BackIcon from './BackIcon';

const useStyles = makeStyles()((theme, { miniVariant }) => ({
  root: {
    height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    gap: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      padding: miniVariant ? theme.spacing(1.5) : 0,
      gap: miniVariant ? theme.spacing(1.5) : 0,
    },
  },
  desktopDrawer: {
    width: miniVariant ? 72 : theme.dimensions.drawerWidthDesktop,
    flexShrink: 0,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      duration: 300,
    }),
    overflowX: 'hidden',
    borderRight: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    '@media print': {
      display: 'none',
    },
  },
  drawerPaper: {
    width: miniVariant ? 72 : theme.dimensions.drawerWidthDesktop,
    overflowX: 'hidden',
    transition: theme.transitions.create(['width', 'border-radius'], {
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      duration: 300,
    }),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: miniVariant ? 24 : 0,
    height: miniVariant ? `calc(100% - ${theme.spacing(3)})` : '100%',
    margin: miniVariant ? theme.spacing(1.5) : 0,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxShadow: miniVariant ? '0 4px 16px rgba(14,15,12,0.08)' : 'none',
    '&::-webkit-scrollbar': { width: 6 },
    '&::-webkit-scrollbar-thumb': { background: '#c5c9c1', borderRadius: 3 },
    ...(miniVariant && {
      '& .MuiList-root': { padding: theme.spacing(0.5, 0) },
      '& .MuiListItemButton-root': {
        justifyContent: 'center',
        padding: theme.spacing(1),
        margin: theme.spacing(0.5, 1),
        minHeight: 48,
        borderRadius: 12,
      },
      '& .MuiListItemIcon-root': {
        minWidth: 0,
        justifyContent: 'center',
        margin: 0,
      },
      '& .MuiListItemText-root': {
        display: 'none',
      },
      '& .MuiDivider-root': {
        margin: theme.spacing(1, 1),
      },
      '& .section-label': {
        display: 'none',
      },
    }),
  },
  toolbar: {
    padding: theme.spacing(1.5, 2),
    minHeight: 64,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexShrink: 0,
  },
  toolbarCollapsed: {
    justifyContent: 'center',
    padding: theme.spacing(1.5, 1),
  },
  brandBox: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    flex: 1,
    minWidth: 0,
  },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#9fe870',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.text.primary,
    letterSpacing: '-0.2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subtitle: {
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '12px',
    color: theme.palette.text.secondary,
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  collapseButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#e8ebe6',
    color: '#0e0f0c',
    flexShrink: 0,
    '&:hover': { backgroundColor: '#d4d8d0' },
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    border: `1px solid ${theme.palette.divider}`,
    color: '#0e0f0c',
    flexShrink: 0,
    '&:hover': { backgroundColor: '#f5f7f4' },
  },
  mobileDrawer: {
    width: theme.dimensions.drawerWidthTablet,
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    border: `1px solid ${theme.palette.divider}`,
    '@media print': { display: 'none' },
  },
  mobileToolbar: {
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
    '@media print': { display: 'none' },
  },
  content: {
    flexGrow: 1,
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
    minWidth: 0,
    borderRadius: miniVariant ? 24 : 0,
    margin: miniVariant ? 0 : 0,
    transition: theme.transitions.create(['border-radius', 'margin'], {
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
      duration: 300,
    }),
  },
  divider: {
    borderColor: theme.palette.divider,
    margin: theme.spacing(0, 2),
  },
  sectionLabel: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.8px',
    color: '#868685',
    padding: theme.spacing(2, 2, 1, 2),
    textTransform: 'uppercase',
    display: miniVariant ? 'none' : 'block',
  },
}));

const PageTitle = ({ breadcrumbs }) => {
  const theme = useTheme();
  const t = useTranslation();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  if (desktop) {
    return (
      <Box sx={{ minWidth: 0 }}>
        <Typography className="title" noWrap sx={{ fontWeight: 700, fontSize: '15px', color: '#0e0f0c' }}>
          {t(breadcrumbs[0])}
        </Typography>
        {breadcrumbs.length > 1 && (
          <Typography sx={{ fontSize: '11px', color: '#868685', fontWeight: 600, letterSpacing: '0.3px', textTransform: 'uppercase' }} noWrap>
            {t(breadcrumbs[breadcrumbs.length - 1])}
          </Typography>
        )}
      </Box>
    );
  }
  return (
    <Breadcrumbs sx={{ '& .MuiTypography-root': { fontSize: '13px', fontWeight: 600 } }}>
      {breadcrumbs.slice(0, -1).map((breadcrumb) => (
        <Typography variant="h6" color="inherit" key={breadcrumb} sx={{ fontSize: 14 }}>
          {t(breadcrumb)}
        </Typography>
      ))}
      <Typography variant="h6" color="textPrimary" sx={{ fontSize: 14, fontWeight: 700 }}>
        {t(breadcrumbs[breadcrumbs.length - 1])}
      </Typography>
    </Breadcrumbs>
  );
};

const PageLayout = ({ menu, breadcrumbs, children }) => {
  const [miniVariant, setMiniVariant] = useState(false);
  const { classes } = useStyles({ miniVariant });
  const theme = useTheme();
  const navigate = useNavigate();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [searchParams] = useSearchParams();
  const [openDrawer, setOpenDrawer] = useState(!desktop && searchParams.has('menu'));
  const toggleDrawer = () => setMiniVariant((v) => !v);

  return (
    <div className={classes.root}>
      {desktop ? (
        <Drawer
          variant="permanent"
          className={classes.desktopDrawer}
          slotProps={{ paper: { className: classes.drawerPaper } }}
        >
          <Toolbar className={`${classes.toolbar} ${miniVariant ? classes.toolbarCollapsed : ''}`} disableGutters>
            {!miniVariant ? (
              <>
                <Box className={classes.brandBox}>
                  <Box className={classes.brandIcon}>
                    <DashboardRoundedIcon sx={{ fontSize: 18, color: '#0e0f0c' }} />
                  </Box>
                  <PageTitle breadcrumbs={breadcrumbs} />
                </Box>
                <Tooltip title="Collapse">
                  <IconButton className={classes.collapseButton} onClick={toggleDrawer} size="small">
                    {theme.direction === 'rtl' ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Expand" placement="right">
                <IconButton className={classes.collapseButton} onClick={toggleDrawer} size="small">
                  {theme.direction === 'rtl' ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
          <Divider className={classes.divider} />
          <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>{menu}</Box>
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          slotProps={{ paper: { className: classes.mobileDrawer } }}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton onClick={() => navigate('/')} className={classes.backButton} size="small">
              <BackIcon />
            </IconButton>
            <PageTitle breadcrumbs={breadcrumbs} />
          </Toolbar>
          <Divider className={classes.divider} />
          {menu}
        </Drawer>
      )}
      {!desktop && (
        <AppBar className={classes.mobileToolbar} position="static" color="inherit" elevation={0}>
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" edge="start" sx={{ mr: 2, backgroundColor: '#e8ebe6', borderRadius: 2, width: 36, height: 36 }} onClick={() => setOpenDrawer(true)}>
              <MenuIcon fontSize="small" />
            </IconButton>
            <PageTitle breadcrumbs={breadcrumbs} />
          </Toolbar>
        </AppBar>
      )}
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default PageLayout;
