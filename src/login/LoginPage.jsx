import { useEffect, useRef, useState } from 'react';
import {
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  Button,
  TextField,
  Link,
  Snackbar,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Divider,
  Alert,
  InputAdornment,
} from '@mui/material';
import CountryFlag from 'react-country-flag';
import { makeStyles } from 'tss-react/mui';
import CloseIcon from '@mui/icons-material/Close';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../store';
import { useLocalization, useTranslation } from '../common/components/LocalizationProvider';
import LoginLayout from './LoginLayout';
import usePersistedState from '../common/util/usePersistedState';
import {
  generateLoginToken,
  handleLoginTokenListeners,
  nativeEnvironment,
  nativePostMessage,
} from '../common/components/NativeInterface';
import LogoImage from './LogoImage';
import { useCatch } from '../reactHelper';
import QrCodeDialog from '../common/components/QrCodeDialog';
import PasswordField from '../common/components/PasswordField';

const useStyles = makeStyles()((theme) => ({
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    minHeight: 32,
  },
  logoMobile: {
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginLeft: 'auto',
  },
  langSelect: {
    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 10px',
      fontSize: '13px',
      fontWeight: 600,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 9999,
      borderColor: 'rgba(14,15,12,0.12)',
    },
    backgroundColor: '#ffffff',
    borderRadius: 9999,
    minWidth: 0,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    border: '1px solid rgba(14,15,12,0.08)',
    color: '#0e0f0c',
    '&:hover': { backgroundColor: '#f5f7f4' },
  },
  header: {
    marginBottom: theme.spacing(2.5),
  },
  eyebrow: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.7px',
    textTransform: 'uppercase',
    color: '#868685',
    marginBottom: 4,
  },
  title: {
    fontWeight: 900,
    fontSize: '22px',
    lineHeight: '26px',
    color: '#0e0f0c',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '13px',
    lineHeight: '18px',
    color: '#454745',
    marginTop: 6,
  },
  formStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.75),
  },
  errorBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#fff0f0',
    border: '1px solid #f4a4a6',
    borderRadius: 12,
    padding: '10px 12px',
    color: '#a7000d',
  },
  errorText: {
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '18px',
    color: '#a7000d',
  },
  primaryButton: {
    marginTop: theme.spacing(0.5),
    height: 48,
    borderRadius: 24,
    fontWeight: 700,
    fontSize: '15px',
    boxShadow: 'none',
    textTransform: 'none',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    margin: theme.spacing(1, 0),
    color: '#868685',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(14,15,12,0.08)',
  },
  extraContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(0.5),
    flexWrap: 'wrap',
  },
  link: {
    cursor: 'pointer',
    color: '#0e0f0c',
    fontWeight: 700,
    fontSize: '13px',
    padding: '6px 10px',
    borderRadius: 9999,
    transition: 'all 150ms ease',
    '&:hover': {
      backgroundColor: '#f5f7f4',
      textDecoration: 'none',
    },
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: '50%',
    backgroundColor: '#c5c9c1',
  },
  flag: {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 1,
  },
  announcement: {
    backgroundColor: '#e2f6d5',
    border: '1px solid rgba(159,232,112,0.5)',
    borderRadius: 12,
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: theme.spacing(2),
  },
  announcementText: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#163300',
    lineHeight: '18px',
    flex: 1,
  },
}));

const LoginPage = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLocalLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({
    code: values[0],
    country: values[1].country,
    name: values[1].name,
  }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showServerTooltip, setShowServerTooltip] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const registrationEnabled = useSelector((state) => state.session.server.registration);
  const languageEnabled = useSelector((state) => {
    const attributes = state.session.server.attributes;
    return !attributes.language && !attributes['ui.disableLoginLanguage'];
  });
  const changeEnabled = useSelector((state) => !state.session.server.attributes.disableChange);
  const emailEnabled = useSelector((state) => state.session.server.emailEnabled);
  const openIdEnabled = useSelector((state) => state.session.server.openIdEnabled);
  const openIdForced = useSelector(
    (state) => state.session.server.openIdEnabled && state.session.server.openIdForce,
  );
  const [codeEnabled, setCodeEnabled] = useState(false);

  const [announcementShown, setAnnouncementShown] = useState(false);
  const announcement = useSelector((state) => state.session.server.announcement);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setFailed(false);
    try {
      const query = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await fetch('/api/session', {
        method: 'POST',
        body: new URLSearchParams(code.length ? `${query}&code=${code}` : query),
      });
      if (response.ok) {
        const user = await response.json();
        generateLoginToken();
        dispatch(sessionActions.updateUser(user));
        const target = window.sessionStorage.getItem('postLogin') || '/';
        window.sessionStorage.removeItem('postLogin');
        navigate(target, { replace: true });
      } else if (response.status === 401 && response.headers.get('WWW-Authenticate') === 'TOTP') {
        setCodeEnabled(true);
      } else {
        throw Error(await response.text());
      }
    } catch {
      setFailed(true);
      setPassword('');
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(`/api/session?token=${encodeURIComponent(token)}`);
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate('/');
    } else if (response.status === 401) {
      nativePostMessage('logout');
    }
  });

  const handleTokenLoginRef = useRef(handleTokenLogin);
  handleTokenLoginRef.current = handleTokenLogin;

  const handleOpenIdLogin = () => {
    document.location = '/api/session/openid/auth';
  };

  useEffect(() => nativePostMessage('authentication'), []);

  useEffect(() => {
    const listener = (token) => handleTokenLoginRef.current(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('hostname') !== window.location.hostname) {
      window.localStorage.setItem('hostname', window.location.hostname);
      setShowServerTooltip(true);
    }
  }, []);

  return (
    <LoginLayout>
      <Box className={classes.topBar}>
        <Box className={classes.logoMobile}>
          {isMobile && <LogoImage color="#0e0f0c" />}
        </Box>
        <Box className={classes.actions}>
          {nativeEnvironment && changeEnabled && (
            <Tooltip
              title={`${t('settingsServer')}: ${window.location.hostname}`}
              open={showServerTooltip}
              arrow
            >
              <IconButton className={classes.iconCircle} size="small" onClick={() => navigate('/change-server')}>
                <VpnLockIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}
          {!nativeEnvironment && (
            <Tooltip title="Scan QR to login" arrow>
              <IconButton className={classes.iconCircle} size="small" onClick={() => setShowQr(true)}>
                <QrCode2Icon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          )}
          {languageEnabled && (
            <FormControl size="small">
              <Select
                value={language}
                onChange={(e) => setLocalLanguage(e.target.value)}
                className={classes.langSelect}
                displayEmpty
                IconComponent={() => null}
                renderValue={(val) => {
                  const l = languageList.find((it) => it.code === val);
                  return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      {l && <span className={classes.flag}><CountryFlag countryCode={l.country} svg style={{ width: '1.2em', height: '1.2em', borderRadius: 2 }} /></span>}
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{l?.code?.toUpperCase()}</span>
                    </Box>
                  );
                }}
              >
                {languageList.map((it) => (
                  <MenuItem key={it.code} value={it.code} sx={{ borderRadius: 12, mx: 0.5, my: 0.25 }}>
                    <span className={classes.flag}>
                      <CountryFlag countryCode={it.country} svg style={{ width: '1.2em', height: '1.2em', borderRadius: 2 }} />
                    </span>
                    <span style={{ marginLeft: 8, fontWeight: 600, fontSize: 13 }}>{it.name}</span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>

      {announcement && !announcementShown && (
        <Box className={classes.announcement}>
          <Box sx={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#9fe870', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ErrorOutlineRoundedIcon sx={{ fontSize: 16, color: '#0e0f0c' }} />
          </Box>
          <Typography className={classes.announcementText}>{announcement}</Typography>
          <IconButton size="small" onClick={() => setAnnouncementShown(true)} sx={{ width: 28, height: 28, borderRadius: 8, backgroundColor: 'rgba(14,15,12,0.06)' }}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      <Box className={classes.header}>
        <Typography className={classes.eyebrow}>Welcome back</Typography>
        <Typography className={classes.title}>{t('loginLogin')}</Typography>
        <Typography className={classes.subtitle}>
          {openIdForced ? 'Continue with your provider' : 'Enter your email and password to continue'}
        </Typography>
      </Box>

      <Box className={classes.formStack}>
        {failed && (
          <Box className={classes.errorBox}>
            <ErrorOutlineRoundedIcon sx={{ fontSize: 18, flexShrink: 0, marginTop: '1px' }} />
            <Typography className={classes.errorText}>Invalid email or password. Please try again.</Typography>
          </Box>
        )}

        {!openIdForced && (
          <>
            <TextField
              required
              error={failed}
              label={t('userEmail')}
              name="email"
              value={email}
              autoComplete="email"
              autoFocus={!email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailRoundedIcon sx={{ fontSize: 18, color: '#868685' }} />
                    </InputAdornment>
                  ),
                },
              }}
              helperText={failed ? ' ' : undefined}
            />
            <PasswordField
              required
              error={failed}
              label={t('userPassword')}
              name="password"
              value={password}
              autoComplete="current-password"
              autoFocus={!!email}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ fontSize: 18, color: '#868685' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {codeEnabled && (
              <TextField
                required
                error={failed}
                label={t('loginTotpCode')}
                name="code"
                value={code}
                type="text"
                inputMode="numeric"
                placeholder="123 456"
                onChange={(e) => setCode(e.target.value)}
              />
            )}
            <Button
              onClick={handlePasswordLogin}
              type="submit"
              variant="contained"
              color="primary"
              disabled={!email || !password || (codeEnabled && !code)}
              fullWidth
              size="large"
              className={classes.primaryButton}
              endIcon={<ArrowForwardRoundedIcon />}
            >
              {t('loginLogin')}
            </Button>
          </>
        )}

        {openIdEnabled && (
          <>
            {!openIdForced && (
              <Box className={classes.dividerRow}>
                <Box className={classes.dividerLine} />
                <span>or</span>
                <Box className={classes.dividerLine} />
              </Box>
            )}
            <Button
              onClick={() => handleOpenIdLogin()}
              variant={openIdForced ? 'contained' : 'outlined'}
              color="primary"
              fullWidth
              size="large"
              className={classes.primaryButton}
              sx={openIdForced ? {} : { backgroundColor: '#ffffff', borderColor: '#0e0f0c', color: '#0e0f0c', '&:hover': { backgroundColor: '#f5f7f4' } }}
            >
              {t('loginOpenId')}
            </Button>
          </>
        )}

        {!openIdForced && (registrationEnabled || emailEnabled) && (
          <Box className={classes.extraContainer}>
            {registrationEnabled && (
              <Link
                onClick={() => navigate('/register')}
                className={classes.link}
                underline="none"
              >
                Create account
              </Link>
            )}
            {registrationEnabled && emailEnabled && <Box className={classes.dot} />}
            {emailEnabled && (
              <Link
                onClick={() => navigate('/reset-password')}
                className={classes.link}
                underline="none"
              >
                {t('loginReset')}
              </Link>
            )}
          </Box>
        )}

        <Typography sx={{ fontSize: '11px', lineHeight: '15px', color: '#868685', textAlign: 'center', marginTop: 1 }}>
          By signing in you agree to our Terms and Privacy Policy.
        </Typography>
      </Box>

      <QrCodeDialog open={showQr} onClose={() => setShowQr(false)} />
      <Snackbar
        open={!!announcement && !announcementShown && false}
        message={announcement}
        action={
          <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </LoginLayout>
  );
};

export default LoginPage;
