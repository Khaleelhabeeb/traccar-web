import { useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import palette from './palette';
import dimensions from './dimensions';
import components from './components';

const typographyBase = {
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 900,
    fontSize: '64px',
    lineHeight: '54.4px',
    letterSpacing: '0',
  },
  h2: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 900,
    fontSize: '47px',
    lineHeight: '70.5px',
    letterSpacing: '-0.108px',
  },
  h3: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 900,
    fontSize: '40px',
    lineHeight: '34px',
    letterSpacing: '0',
  },
  h4: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 600,
    fontSize: '32px',
    lineHeight: '38.4px',
    letterSpacing: '-0.96px',
  },
  h5: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '31.2px',
    letterSpacing: '-0.48px',
  },
  h6: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0',
  },
  subtitle1: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0',
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0',
  },
  body1: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0',
  },
  body2: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0',
  },
  button: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0',
    textTransform: 'none',
  },
  caption: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0',
  },
  overline: {
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
};

export default (server, darkMode, direction) =>
  useMemo(
    () =>
      createTheme({
        typography: typographyBase,
        palette: palette(server, darkMode),
        direction,
        dimensions,
        components,
        shape: {
          borderRadius: 12,
        },
        spacing: 4,
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
        },
      }),
    [server, darkMode, direction],
  );
