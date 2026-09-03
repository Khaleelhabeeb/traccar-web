import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
  },
  containerMap: {
    flexBasis: 'var(--report-map-height, 40%)',
    flexShrink: 0,
    borderRadius: 24,
    overflow: 'hidden',
    margin: theme.spacing(2, 2, 0),
    border: `1px solid ${theme.palette.divider}`,
  },
  containerMain: {
    overflow: 'auto',
    flex: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
  header: {
    position: 'sticky',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  columnAction: {
    width: '1%',
    paddingLeft: theme.spacing(1),
    '@media print': {
      display: 'none',
    },
  },
  columnActionContainer: {
    display: 'flex',
  },
  filter: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    padding: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    '@media print': {
      display: 'none !important',
    },
  },
  filterItem: {
    minWidth: 0,
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
  },
  filterButtons: {
    display: 'flex',
    gap: theme.spacing(1),
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
  },
  filterButton: {
    flexGrow: 1,
    borderRadius: 24,
  },
  chart: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
  actionCellPadding: {
    '&.MuiTableCell-body': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '@media print': {
      display: 'none',
    },
  },
  table: {
    '& .MuiTableCell-head': {
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));
