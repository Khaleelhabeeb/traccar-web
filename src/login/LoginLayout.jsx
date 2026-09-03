import { useMediaQuery, Paper, Typography, Box, Chip } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import LogoImage from './LogoImage';

const useStyles = makeStyles()((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8ebe6',
    padding: theme.spacing(3),
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      alignItems: 'flex-start',
    },
  },
  blob: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },
  blobGreen: {
    width: 520,
    height: 520,
    background: 'radial-gradient(circle, rgba(159,232,112,0.18) 0%, rgba(159,232,112,0) 70%)',
    top: -120,
    left: -80,
    [theme.breakpoints.down('md')]: { display: 'none' },
  },
  blobCyan: {
    width: 420,
    height: 420,
    background: 'radial-gradient(circle, rgba(56,200,255,0.10) 0%, rgba(56,200,255,0) 70%)',
    bottom: -80,
    left: 280,
    [theme.breakpoints.down('md')]: { display: 'none' },
  },
  container: {
    width: '100%',
    maxWidth: 1120,
    display: 'grid',
    gridTemplateColumns: '1.05fr 440px',
    gap: theme.spacing(4),
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 400px',
      gap: theme.spacing(3),
      maxWidth: 980,
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      maxWidth: 440,
    },
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(2, 2, 2, 1),
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 9999,
    padding: '6px 12px',
    width: 'fit-content',
    border: '1px solid rgba(14,15,12,0.08)',
    boxShadow: '0 1px 4px rgba(14,15,12,0.06)',
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#2ead4b',
    boxShadow: '0 0 0 4px rgba(46,173,75,0.15)',
  },
  badgeText: {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: '#0e0f0c',
  },
  heroTitle: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    fontWeight: 900,
    fontSize: '56px',
    lineHeight: '52px',
    letterSpacing: '-1.5px',
    color: '#0e0f0c',
    [theme.breakpoints.down('lg')]: {
      fontSize: '44px',
      lineHeight: '42px',
      letterSpacing: '-1px',
    },
  },
  heroTitleAccent: {
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 6,
      width: '100%',
      height: 8,
      backgroundColor: 'rgba(159,232,112,0.35)',
      borderRadius: 4,
      zIndex: -1,
    },
  },
  heroSubtitle: {
    fontSize: '17px',
    lineHeight: '26px',
    color: '#454745',
    fontWeight: 400,
    maxWidth: 480,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(1.25),
    },
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: theme.spacing(1.75, 1.75),
    border: '1px solid rgba(14,15,12,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    transition: 'all 180ms ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(14,15,12,0.06)',
      borderColor: 'rgba(14,15,12,0.12)',
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(1.5),
    },
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '13.5px',
    fontWeight: 700,
    lineHeight: '18px',
    color: '#0e0f0c',
    letterSpacing: '-0.1px',
  },
  featureDesc: {
    fontSize: '12px',
    lineHeight: '16px',
    color: '#454745',
    fontWeight: 400,
  },
  trustRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.75),
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2.5),
    borderTop: '1px solid rgba(14,15,12,0.08)',
  },
  avatarStack: {
    display: 'flex',
    '& > div': {
      width: 30,
      height: 30,
      borderRadius: '50%',
      border: '2px solid #e8ebe6',
      marginLeft: -6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontWeight: 800,
      color: '#ffffff',
      '&:first-of-type': { marginLeft: 0 },
    },
  },
  trustText: {
    fontSize: '12.5px',
    lineHeight: '16px',
    color: '#454745',
    '& strong': { color: '#0e0f0c', fontWeight: 700 },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    border: '1px solid rgba(14,15,12,0.08)',
    boxShadow: '0 8px 32px rgba(14,15,12,0.08), 0 1px 4px rgba(14,15,12,0.06)',
    overflow: 'hidden',
    position: 'relative',
  },
  paperGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    background: 'linear-gradient(90deg, rgba(159,232,112,0) 0%, rgba(159,232,112,0.6) 50%, rgba(56,200,255,0) 100%)',
  },
  form: {
    padding: theme.spacing(4),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  logoWrapper: {
    marginBottom: theme.spacing(0.5),
  },
}));

const LoginLayout = ({ children }) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isDesktop = !useMediaQuery(theme.breakpoints.down('md'));

  return (
    <main className={classes.root}>
      <Box className={`${classes.blob} ${classes.blobGreen}`} />
      <Box className={`${classes.blob} ${classes.blobCyan}`} />
      <div className={classes.container}>
        <div className={classes.hero}>
          <Box className={classes.logoWrapper}>
            <LogoImage color="#0e0f0c" />
          </Box>

          <Box className={classes.badge}>
            <Box className={classes.badgeDot} />
            <span className={classes.badgeText}>Trusted by 50,000+ fleets worldwide</span>
          </Box>

          <Typography className={classes.heroTitle}>
            Tracking
            <br />
            made <span className={classes.heroTitleAccent}>simple</span>.
          </Typography>

          <Typography className={classes.heroSubtitle}>
            The open-source GPS platform teams rely on — real-time location, geofences and reports, all in one calm, fast workspace.
          </Typography>

          <div className={classes.features}>
            <Box className={classes.featureCard}>
              <Box className={classes.featureIcon} sx={{ backgroundColor: '#d9f0ff', color: '#003d6b' }}>
                <MapRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <div className={classes.featureTitle}>Live map</div>
                <div className={classes.featureDesc}>Sub-second updates & history replay</div>
              </Box>
            </Box>
            <Box className={classes.featureCard}>
              <Box className={classes.featureIcon} sx={{ backgroundColor: '#e2f6d5', color: '#163300' }}>
                <ShieldRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <div className={classes.featureTitle}>Secure</div>
                <div className={classes.featureDesc}>Self-hosted, encrypted, private</div>
              </Box>
            </Box>
            <Box className={classes.featureCard}>
              <Box className={classes.featureIcon} sx={{ backgroundColor: '#fff7cc', color: '#665500' }}>
                <BoltRoundedIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <div className={classes.featureTitle}>Automations</div>
                <div className={classes.featureDesc}>Alerts, geofences & webhooks</div>
              </Box>
            </Box>
          </div>

          <Box className={classes.trustRow}>
            <Box className={classes.avatarStack}>
              <Box sx={{ backgroundColor: '#0e0f0c' }}>A</Box>
              <Box sx={{ backgroundColor: '#454745' }}>B</Box>
              <Box sx={{ backgroundColor: '#9fe870', color: '#0e0f0c !important' }}>+2k</Box>
            </Box>
            <Typography className={classes.trustText}>
              <strong>4.8/5</strong> from 1,200+ reviews • <strong>99.9%</strong> uptime
            </Typography>
          </Box>
        </div>

        <Paper className={classes.paper} elevation={0}>
          <Box className={classes.paperGlow} />
          <form className={classes.form}>{children}</form>
        </Paper>
      </div>
    </main>
  );
};

export default LoginLayout;
