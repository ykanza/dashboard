import { useField } from 'formik';
import TextField from '@mui/material/TextField';

export default function InputField(props) {
  const { ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    if (Boolean(meta.touched && meta.error))
      return meta.error;
  }

  return (
    <TextField
        error={Boolean(meta.touched && meta.error)}
        helperText={_renderHelperText()}
        {...field}
        {...rest}
    />
  );
}
