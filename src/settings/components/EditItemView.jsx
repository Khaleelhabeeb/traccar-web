import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
  TextField,
  Paper,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCatch, useAsyncTask } from '../../reactHelper';
import { useTranslation } from '../../common/components/LocalizationProvider';
import PageLayout from '../../common/components/PageLayout';
import useSettingsStyles from '../common/useSettingsStyles';
import fetchOrThrow from '../../common/util/fetchOrThrow';

const useStyles = makeStyles()((theme) => ({
  formCard: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 24,
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const EditItemView = ({
  children,
  endpoint,
  item,
  setItem,
  defaultItem,
  validate,
  onItemSaved,
  menu,
  breadcrumbs,
}) => {
  const navigate = useNavigate();
  const { classes } = useSettingsStyles();
  const { classes: local } = useStyles();
  const t = useTranslation();

  const { id } = useParams();

  useAsyncTask(
    async ({ signal }) => {
      if (!item) {
        if (id) {
          const response = await fetchOrThrow(`/api/${endpoint}/${id}`, { signal });
          setItem(await response.json());
        } else {
          setItem(defaultItem || {});
        }
      }
    },
    [id, item, defaultItem, endpoint, setItem],
  );

  const handleSave = useCatch(async () => {
    let url = `/api/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }

    const response = await fetchOrThrow(url, {
      method: !id ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (onItemSaved) {
      onItemSaved(await response.json());
    }
    navigate(-1);
  });

  return (
    <PageLayout menu={menu} breadcrumbs={breadcrumbs}>
      <Container maxWidth="xs" className={classes.container} style={{ background: 'transparent', border: 'none', padding: 0, marginTop: 24 }}>
        <Paper elevation={0} className={local.formCard}>
          {item ? (
            children
          ) : (
            <Accordion defaultExpanded>
              <AccordionSummary>
                <Typography variant="subtitle1">
                  <Skeleton width="10em" />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={-i} width="100%">
                    <TextField />
                  </Skeleton>
                ))}
              </AccordionDetails>
            </Accordion>
          )}
          <div className={classes.buttons}>
            <Button color="primary" variant="outlined" onClick={() => navigate(-1)} disabled={!item}>
              {t('sharedCancel')}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSave}
              disabled={!item || !validate()}
            >
              {t('sharedSave')}
            </Button>
          </div>
        </Paper>
      </Container>
    </PageLayout>
  );
};

export default EditItemView;
