import { makeStyles } from 'tss-react/mui';
import { ListItemButton, ListItemIcon, ListItemText, Box, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

const getTint = (title, selected) => {
  if (selected) return { bg: '#9fe870', icon: '#0e0f0c' };
  const t = (title || '').toLowerCase();
  if (t.includes('preference') || t.includes('settings') || t.includes('server')) return { bg: '#e8ebe6', icon: '#454745' };
  if (t.includes('notification') || t.includes('event')) return { bg: '#fff7cc', icon: '#665500' };
  if (t.includes('user') || t.includes('people')) return { bg: '#e2f6d5', icon: '#163300' };
  if (t.includes('device')) return { bg: '#d9f0ff', icon: '#003d6b' };
  if (t.includes('geofence') || t.includes('place')) return { bg: '#c5edab', icon: '#163300' };
  if (t.includes('group') || t.includes('folder')) return { bg: '#ffe4cc', icon: '#7a3d00' };
  if (t.includes('driver') || t.includes('person')) return { bg: '#f0e8ff', icon: '#3d1a7a' };
  if (t.includes('calendar') || t.includes('today')) return { bg: '#d9f0ff', icon: '#003d6b' };
  if (t.includes('attribute') || t.includes('calculate')) return { bg: '#f5f7f4', icon: '#454745' };
  if (t.includes('maintenance') || t.includes('build')) return { bg: '#ffd9d1', icon: '#7a1c0a' };
  if (t.includes('command') || t.includes('send')) return { bg: '#0e0f0c', icon: '#9fe870' };
  if (t.includes('combined') || t.includes('star')) return { bg: '#9fe870', icon: '#0e0f0c' };
  if (t.includes('trip') || t.includes('play')) return { bg: '#c5edab', icon: '#163300' };
  if (t.includes('stop') || t.includes('pause')) return { bg: '#ffe4cc', icon: '#7a3d00' };
  if (t.includes('summary') || t.includes('list')) return { bg: '#e8ebe6', icon: '#454745' };
  if (t.includes('chart') || t.includes('trending') || t.includes('statistic') || t.includes('bar')) return { bg: '#d9f0ff', icon: '#003d6b' };
  if (t.includes('replay') || t.includes('route') || t.includes('timeline')) return { bg: '#e2f6d5', icon: '#163300' };
  if (t.includes('log') || t.includes('note')) return { bg: '#f5f7f4', icon: '#454745' };
  if (t.includes('schedule') || t.includes('repeat')) return { bg: '#fff7cc', icon: '#665500' };
  if (t.includes('audit') || t.includes('verified')) return { bg: '#e8ebe6', icon: '#454745' };
  if (t.includes('announcement') || t.includes('campaign')) return { bg: '#ffc091', icon: '#4a1c00' };
  if (t.includes('billing') || t.includes('payment')) return { bg: '#ffe4cc', icon: '#7a3d00' };
  if (t.includes('support') || t.includes('help')) return { bg: '#38c8ff', icon: '#0e0f0c' };
  return { bg: '#f5f7f4', icon: '#454745' };
};

const useStyles = makeStyles()((theme, { selected }) => ({
  menuItem: {
    borderRadius: 14,
    margin: '2px 8px',
    padding: '8px 10px',
    gap: 0,
    position: 'relative',
    overflow: 'hidden',
    border: '1px solid transparent',
    transition: 'all 200ms cubic-bezier(0.2,0,0,1)',
    backgroundColor: selected ? '#e2f6d5' : 'transparent',
    borderColor: selected ? 'rgba(159,232,112,0.4)' : 'transparent',
    '&:hover': {
      backgroundColor: selected ? '#d4edc5' : '#f5f7f4',
      borderColor: selected ? 'rgba(159,232,112,0.6)' : 'rgba(14,15,12,0.06)',
      transform: 'translateX(1px)',
    },
    '&.Mui-selected': {
      backgroundColor: '#e2f6d5',
    },
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 10,
    flexShrink: 0,
    transition: 'all 200ms ease',
  },
  menuItemText: {
    whiteSpace: 'nowrap',
    marginLeft: 12,
    flex: 1,
    minWidth: 0,
    '& .MuiTypography-root': {
      fontWeight: selected ? 700 : 500,
      fontSize: '13.5px',
      lineHeight: '18px',
      letterSpacing: '-0.1px',
      color: selected ? '#0e0f0c' : '#454745',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  selectedBar: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 3,
    height: selected ? 20 : 0,
    backgroundColor: '#9fe870',
    borderRadius: 3,
    transition: 'height 200ms ease',
  },
}));

const MenuItem = ({ title, link, icon, selected }) => {
  const { classes } = useStyles({ selected });
  const tint = getTint(title, selected);
  const external = link?.startsWith('http');

  const content = (
    <ListItemButton
      key={link}
      component={external ? 'a' : Link}
      href={external ? link : undefined}
      to={external ? undefined : link}
      target={external ? '_blank' : undefined}
      selected={selected}
      className={classes.menuItem}
      disableRipple={false}
    >
      <Box className={classes.selectedBar} />
      <ListItemIcon sx={{ minWidth: 0, margin: 0 }}>
        <Box
          className={classes.iconWrapper}
          sx={{
            backgroundColor: tint.bg,
            color: tint.icon,
            boxShadow: selected ? '0 1px 4px rgba(14,15,12,0.08)' : 'none',
            '& svg': { fontSize: 18 },
          }}
        >
          {icon}
        </Box>
      </ListItemIcon>
      <ListItemText primary={title} className={classes.menuItemText} />
    </ListItemButton>
  );

  // Always tooltip for collapsed sidebar UX; placement right is unobtrusive when expanded
  return (
    <Tooltip title={title} placement="right" arrow enterDelay={300} enterNextDelay={300}>
      <Box sx={{ display: 'block' }}>{content}</Box>
    </Tooltip>
  );
};

export default MenuItem;
