import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import useStyles from '../Views/styles';

import {
  InputField
} from '../FormFields';

export default function RegistrationForm(props) {
  const {
    formField: {
      username,
      email,
      emailConfirmation,
      password
    }
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom className={classes.typographyClass}>Inscription</Typography>
        </Grid>
        <Grid item xs={12}>
          <InputField name={username.name} label={username.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={email.name} label={email.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={emailConfirmation.name} label={emailConfirmation.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={password.name} label={password.label} fullWidth type="password" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
