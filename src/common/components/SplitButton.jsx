import { useRef, useState } from 'react';
import { Button, ButtonGroup, Menu, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SplitButton = ({
  fullWidth,
  variant,
  color,
  disabled,
  onClick,
  options,
  selected,
  setSelected,
}) => {
  const anchorRef = useRef();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  return (
    <>
      <ButtonGroup
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        ref={anchorRef}
        sx={{
          borderRadius: '24px',
          '& .MuiButtonGroup-grouped': {
            borderRadius: '24px',
            '&:not(:last-of-type)': { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            '&:not(:first-of-type)': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
          },
        }}
      >
        <Button disabled={disabled} onClick={() => onClick(selected)} sx={{ borderRadius: '24px' }}>
          <Typography variant="button" noWrap>
            {options[selected]}
          </Typography>
        </Button>
        <Button
          fullWidth={false}
          size="small"
          onClick={() => setMenuAnchorEl(anchorRef.current)}
          sx={{ minWidth: 40, borderRadius: '24px' }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        open={!!menuAnchorEl}
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: { borderRadius: 3, mt: 1, border: '1px solid rgba(14,15,12,0.08)' },
          },
        }}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem
            key={key}
            onClick={() => {
              setSelected(key);
              setMenuAnchorEl(null);
            }}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SplitButton;
