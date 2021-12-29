import * as React from 'react';
import {useField} from 'formik';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from '@mui/material';
import useStyles from './styles';

export default function CheckboxField(props) {
  const classes = useStyles();
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { setValue } = helper;

  function _renderHelperText() {
    if (Boolean(meta.touched && meta.error))
      return <FormHelperText>{meta.error}</FormHelperText>;
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest}>
      <FormControlLabel
        value={field.value}
        checked={field.value}
        control={<Checkbox className={classes.tickSize} {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
}
