export default {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 24,
        padding: '12px 24px',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '24px',
        textTransform: 'none',
        minHeight: 48,
      },
      containedPrimary: {
        backgroundColor: '#9fe870',
        color: '#0e0f0c',
        '&:hover': {
          backgroundColor: '#cdffad',
        },
        '&:active': {
          backgroundColor: '#c5edab',
        },
      },
      containedSecondary: {
        backgroundColor: '#e8ebe6',
        color: '#0e0f0c',
        '&:hover': {
          backgroundColor: '#d4d8d0',
        },
      },
      outlinedPrimary: {
        border: '1px solid #0e0f0c',
        color: '#0e0f0c',
        backgroundColor: '#ffffff',
        '&:hover': {
          backgroundColor: '#f5f7f4',
          border: '1px solid #0e0f0c',
        },
      },
      outlinedSecondary: {
        border: '1px solid #868685',
        color: '#0e0f0c',
        '&:hover': {
          border: '1px solid #0e0f0c',
        },
      },
      sizeSmall: {
        padding: '8px 16px',
        minHeight: 36,
        fontSize: '14px',
        borderRadius: 16,
      },
      sizeMedium: {
        padding: '12px 24px',
        minHeight: 48,
        borderRadius: 24,
      },
      sizeLarge: {
        padding: '16px 32px',
        minHeight: 56,
        fontSize: '18px',
        borderRadius: 24,
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 24,
        padding: 8,
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: 24,
        border: 'none',
        backgroundColor: '#ffffff',
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
      rounded: {
        borderRadius: 24,
      },
      elevation1: {
        boxShadow: 'none',
      },
      elevation2: {
        boxShadow: 'none',
      },
      elevation3: {
        boxShadow: '0px 2px 8px rgba(14, 15, 12, 0.08)',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          backgroundColor: '#ffffff',
          '& fieldset': {
            borderColor: '#0e0f0c',
            borderWidth: 1,
          },
          '&:hover fieldset': {
            borderColor: '#0e0f0c',
            borderWidth: 1,
          },
          '&.Mui-focused fieldset': {
            borderColor: '#0e0f0c',
            borderWidth: 2,
          },
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        '& fieldset': {
          borderColor: '#0e0f0c',
          borderWidth: 1,
        },
        '&:hover fieldset': {
          borderColor: '#0e0f0c',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#0e0f0c',
          borderWidth: 2,
        },
      },
      input: {
        padding: '12px 16px',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#454745',
        fontWeight: 400,
        '&.Mui-focused': {
          color: '#0e0f0c',
        },
      },
    },
  },
  MuiFormControl: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiSelect: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#0e0f0c',
          borderWidth: 1,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#0e0f0c',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#0e0f0c',
          borderWidth: 2,
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: '2px 4px',
        '&:hover': {
          backgroundColor: '#e8ebe6',
        },
        '&.Mui-selected': {
          backgroundColor: '#e2f6d5',
          '&:hover': {
            backgroundColor: '#d4edc5',
          },
        },
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        margin: '2px 8px',
        '&:hover': {
          backgroundColor: '#e8ebe6',
        },
        '&.Mui-selected': {
          backgroundColor: '#e2f6d5',
          '&:hover': {
            backgroundColor: '#d4edc5',
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: '1px solid rgba(14, 15, 12, 0.08)',
        padding: '12px 16px',
        '@media print': {
          color: '#0e0f0c',
        },
      },
      head: {
        fontWeight: 600,
        color: '#454745',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-root': {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    },
  },
  MuiTooltip: {
    defaultProps: {
      enterDelay: 500,
      enterNextDelay: 500,
    },
    styleOverrides: {
      tooltip: {
        backgroundColor: '#0e0f0c',
        borderRadius: 8,
        fontSize: '12px',
        padding: '8px 12px',
      },
    },
  },
  MuiDialog: {
    defaultProps: {
      PaperProps: {
        elevation: 0,
      },
    },
    styleOverrides: {
      paper: {
        borderRadius: 24,
        border: 'none',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: '#ffffff',
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundColor: '#ffffff',
        color: '#0e0f0c',
        borderBottom: '1px solid rgba(14, 15, 12, 0.08)',
      },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: {
        minHeight: 56,
        padding: '0 16px',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        minHeight: 48,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: '#0e0f0c',
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#0e0f0c',
          '& + .MuiSwitch-track': {
            backgroundColor: '#9fe870',
          },
        },
      },
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: '#0e0f0c',
        '&.Mui-checked': {
          color: '#0e0f0c',
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        color: '#0e0f0c',
        '&.Mui-checked': {
          color: '#0e0f0c',
        },
      },
    },
  },
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        border: '1px solid rgba(14, 15, 12, 0.08)',
        borderRadius: 12,
        '&:before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: 0,
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        minHeight: 48,
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: '#e8ebe6',
        borderRadius: 4,
      },
      bar: {
        backgroundColor: '#9fe870',
        borderRadius: 4,
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: '#9fe870',
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: '#d03238',
      },
      dot: {
        width: 8,
        height: 8,
        borderRadius: '50%',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 600,
      },
      colorPrimary: {
        backgroundColor: '#e2f6d5',
        color: '#054d28',
      },
      colorSecondary: {
        backgroundColor: '#e8ebe6',
        color: '#0e0f0c',
      },
    },
  },
};
