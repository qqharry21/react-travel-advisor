/** @format */
import { makeStyles } from '@mui/styles';
export default makeStyles(theme => ({
  formControl: {
    margin: `${theme.spacing(1)} !important`,
    minWidth: `120px !important`,
    marginBottom: '30px !important',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '600px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: '25px !important',
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: '75vh',
    overflow: 'auto',
  },
}));
