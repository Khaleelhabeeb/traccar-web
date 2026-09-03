const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

export default (server, darkMode) => {
  const primaryMain = validatedColor(server?.attributes?.colorPrimary) || '#9fe870';

  return {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: primaryMain,
      light: '#cdffad',
      dark: '#6fb84a',
      contrastText: '#0e0f0c',
    },
    secondary: {
      main: '#e8ebe6',
      light: '#f5f7f4',
      dark: '#c5c9c1',
      contrastText: '#0e0f0c',
    },
    background: {
      default: '#e8ebe6',
      paper: '#ffffff',
    },
    text: {
      primary: '#0e0f0c',
      secondary: '#454745',
      disabled: '#868685',
    },
    error: {
      main: '#d03238',
      light: '#f4a4a6',
      dark: '#a72027',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffd11a',
      light: '#ffe066',
      dark: '#b86700',
      contrastText: '#4a3b1c',
    },
    success: {
      main: '#2ead4b',
      light: '#6fd88a',
      dark: '#054d28',
      contrastText: '#ffffff',
    },
    info: {
      main: '#38c8ff',
      light: '#82d9ff',
      dark: '#009acc',
      contrastText: '#0e0f0c',
    },
    neutral: {
      main: '#868685',
      light: '#c5edab',
      dark: '#454745',
    },
    geometry: {
      main: '#38c8ff',
    },
    divider: 'rgba(14, 15, 12, 0.12)',
    alwaysDark: {
      main: '#0e0f0c',
    },
  };
};
