import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: '#6c63ff'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  error: {
    "&.react-tel-input .form-control": {
      borderColor: "#d32f2f!important",
      color: "#d32f2f!important",
      boxShadow: "0px 0px 0px 0px #6c63fff!important",
    },
    "&.react-tel-input .form-control:focus": {
      boxShadow: "0px 0px 0px 1px #d32f2f!important",
    },
    "& #placeholder": {
      color: "#d32f2f!important",
    }
  },
  containerClass: {
    "&.react-tel-input .form-control": {
      width: '100%!important'
    },
  },
  typographyClass: {
    fontWeight: 600,
    color: '#6c63ff'
  },
  mobileStepper: {
    "& .MuiMobileStepper-dots": {
      margin: 'auto'
    }
  },
  paymentBtn: {
    height: 50,
    fontWeight: 'bold',
    marginTop: 10
  }
}));
