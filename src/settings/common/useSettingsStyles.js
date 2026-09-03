import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  table: {
    marginBottom: theme.spacing(10),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiTableHead-root': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  columnAction: {
    width: '1%',
    paddingRight: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    border: `1px solid ${theme.palette.divider}`,
  },
  buttons: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    '& > *': {
      minWidth: 120,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  verticalActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
  },
  searchHeader: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));
