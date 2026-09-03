import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';
import {
  IconButton,
  Tooltip,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Typography,
  Box,
  Badge,
} from '@mui/material';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Battery60Icon from '@mui/icons-material/Battery60';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import Battery20Icon from '@mui/icons-material/Battery20';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import ErrorIcon from '@mui/icons-material/Error';
import CircleIcon from '@mui/icons-material/Circle';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { devicesActions } from '../store';
import {
  formatAlarm,
  formatBoolean,
  formatPercentage,
  formatStatus,
  getStatusColor,
} from '../common/util/formatter';
import { useTranslation } from '../common/components/LocalizationProvider';
import { mapIconKey, mapIcons } from '../map/core/preloadImages';
import { useAdministrator } from '../common/util/permissions';
import EngineIcon from '../resources/images/data/engine.svg?react';
import { useAttributePreference } from '../common/util/preferences';
import GeofencesValue from '../common/components/GeofencesValue';
import DriverValue from '../common/components/DriverValue';
import MotionBar from './components/MotionBar';

dayjs.extend(relativeTime);

const statusTint = (status) => {
  if (status === 'online') return { bg: '#e2f6d5', dot: '#2ead4b', iconBg: '#9fe870' };
  if (status === 'offline') return { bg: '#f5f7f4', dot: '#868685', iconBg: '#e8ebe6' };
  return { bg: '#fff7cc', dot: '#b86700', iconBg: '#ffe066' };
};

const useStyles = makeStyles()((theme) => ({
  row: {
    padding: theme.spacing(0.5, 1),
  },
  button: {
    borderRadius: 16,
    padding: theme.spacing(1, 1.5),
    gap: theme.spacing(1),
    border: '1px solid transparent',
    transition: 'all 180ms ease',
    '&.Mui-selected': {
      backgroundColor: '#e2f6d5',
      borderColor: 'rgba(159,232,112,0.5)',
      '&:hover': {
        backgroundColor: '#d4edc5',
      },
    },
    '&:hover': {
      backgroundColor: '#f5f7f4',
      borderColor: 'rgba(14,15,12,0.06)',
    },
  },
  avatarWrap: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: '1px solid rgba(14,15,12,0.08)',
  },
  icon: {
    width: '20px',
    height: '20px',
    filter: 'brightness(0) invert(1)',
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: '50%',
    border: '2px solid #ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: { color: '#2ead4b' },
  warning: { color: '#b86700' },
  error: { color: '#d03238' },
  neutral: { color: '#868685' },
  primaryText: {
    fontWeight: 700,
    fontSize: '13.5px',
    lineHeight: '18px',
    color: '#0e0f0c',
    letterSpacing: '-0.1px',
  },
  secondaryText: {
    fontSize: '11.5px',
    lineHeight: '16px',
    color: '#454745',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  statusPill: {
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    padding: '1px 6px',
    borderRadius: 6,
    lineHeight: '14px',
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#f5f7f4',
    '&:hover': { backgroundColor: '#e8ebe6' },
  },
}));

const DeviceRow = ({ devices, index, style }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const admin = useAdministrator();
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);

  const item = devices[index];
  const position = useSelector((state) => state.session.positions[item.id]);

  const devicePrimary = useAttributePreference('devicePrimary', 'name');
  const deviceSecondary = useAttributePreference('deviceSecondary', '');

  const resolveFieldValue = (field) => {
    if (field === 'geofenceIds') {
      const geofenceIds = position?.geofenceIds;
      return geofenceIds?.length ? <GeofencesValue geofenceIds={geofenceIds} /> : null;
    }
    if (field === 'driverUniqueId') {
      const driverUniqueId = position?.attributes?.driverUniqueId;
      return driverUniqueId ? <DriverValue driverUniqueId={driverUniqueId} /> : null;
    }
    if (field === 'motion') {
      return <MotionBar deviceId={item.id} />;
    }
    return item[field];
  };

  const primaryValue = resolveFieldValue(devicePrimary);
  const secondaryValue = resolveFieldValue(deviceSecondary);
  const tint = statusTint(item.status);
  const statusColor = getStatusColor(item.status);

  const secondaryText = () => {
    let status;
    if (item.status === 'online' || !item.lastUpdate) {
      status = formatStatus(item.status, t);
    } else {
      status = dayjs(item.lastUpdate).fromNow();
    }
    const pillBg = statusColor === 'success' ? '#e2f6d5' : statusColor === 'error' ? '#ffd9d1' : statusColor === 'warning' ? '#fff7cc' : '#e8ebe6';
    const pillColor = statusColor === 'success' ? '#054d28' : statusColor === 'error' ? '#a7000d' : statusColor === 'warning' ? '#4a3b1c' : '#454745';
    return (
      <span className={classes.secondaryText}>
        {secondaryValue && <span style={{ color: '#454745', fontWeight: 500 }}>{secondaryValue} • </span>}
        <span className={classes.statusPill} style={{ backgroundColor: pillBg, color: pillColor }}>{status}</span>
      </span>
    );
  };

  return (
    <div style={style} className={classes.row}>
      <ListItemButton
        key={item.id}
        onClick={() => dispatch(devicesActions.selectId(item.id))}
        disabled={!admin && item.disabled}
        selected={selectedDeviceId === item.id}
        className={classes.button}
      >
        <ListItemAvatar sx={{ minWidth: 48 }}>
          <Box className={classes.avatarWrap}>
            <Avatar className={classes.avatar} sx={{ backgroundColor: tint.bg }}>
              <img className={classes.icon} src={mapIcons[mapIconKey(item.category)]} alt="" style={{ filter: item.status === 'online' ? 'none' : 'grayscale(1) opacity(0.7)' }} />
            </Avatar>
            <Box className={classes.statusDot} sx={{ backgroundColor: tint.dot }}>
              <CircleIcon sx={{ fontSize: 6, color: '#ffffff' }} />
            </Box>
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={primaryValue}
          secondary={secondaryText()}
          slots={{ primary: Typography, secondary: Typography }}
          slotProps={{
            primary: { noWrap: true, className: classes.primaryText },
            secondary: { noWrap: true, component: 'div' },
          }}
          sx={{ minWidth: 0, my: 0 }}
        />
        {position && (
          <Box sx={{ display: 'flex', gap: 0.5, ml: 1, flexShrink: 0 }}>
            {position.attributes.hasOwnProperty('alarm') && (
              <Tooltip title={`${t('eventAlarm')}: ${formatAlarm(position.attributes.alarm, t)}`}>
                <IconButton size="small" className={classes.iconButton} sx={{ backgroundColor: '#ffd9d1' }}>
                  <ErrorIcon sx={{ fontSize: 16 }} className={classes.error} />
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty('ignition') && (
              <Tooltip title={`${t('positionIgnition')}: ${formatBoolean(position.attributes.ignition, t)}`}>
                <IconButton size="small" className={classes.iconButton} sx={{ backgroundColor: position.attributes.ignition ? '#e2f6d5' : '#f5f7f4' }}>
                  {position.attributes.ignition ? (
                    <EngineIcon width={16} height={16} className={classes.success} />
                  ) : (
                    <EngineIcon width={16} height={16} className={classes.neutral} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty('batteryLevel') && (
              <Tooltip title={`${t('positionBatteryLevel')}: ${formatPercentage(position.attributes.batteryLevel)}`}>
                <IconButton size="small" className={classes.iconButton} sx={{ backgroundColor: position.attributes.batteryLevel > 70 ? '#e2f6d5' : position.attributes.batteryLevel > 30 ? '#fff7cc' : '#ffd9d1' }}>
                  {(position.attributes.batteryLevel > 70 &&
                    (position.attributes.charge ? (
                      <BatteryChargingFullIcon sx={{ fontSize: 16 }} className={classes.success} />
                    ) : (
                      <BatteryFullIcon sx={{ fontSize: 16 }} className={classes.success} />
                    ))) ||
                    (position.attributes.batteryLevel > 30 &&
                      (position.attributes.charge ? (
                        <BatteryCharging60Icon sx={{ fontSize: 16 }} className={classes.warning} />
                      ) : (
                        <Battery60Icon sx={{ fontSize: 16 }} className={classes.warning} />
                      ))) ||
                    (position.attributes.charge ? (
                      <BatteryCharging20Icon sx={{ fontSize: 16 }} className={classes.error} />
                    ) : (
                      <Battery20Icon sx={{ fontSize: 16 }} className={classes.error} />
                    ))}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </ListItemButton>
    </div>
  );
};

export default DeviceRow;
