import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import useStyles from '../Views/styles';

import {
  InputField
} from '../FormFields';

export default function LoginForm(props) {
  const {
    formField: {
      email,
      password
    }
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom className={classes.typographyClass}>Connexion</Typography>
        </Grid>
        <Grid item xs={12}>
          <InputField name={email.name} label={email.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={password.name} label={password.label} fullWidth type="password" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
