import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles()((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: 'none',
  },
  toolbar: {
    padding: '12px 16px',
    minHeight: '56px',
  },
  title: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    fontSize: '16px',
    lineHeight: '24px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary,
  },
}));

const Navbar = ({ setOpenDrawer, title }) => {
  const { classes } = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          edge="start"
          className={classes.menuButton}
          onClick={() => setOpenDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} noWrap>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
