import {Link, Typography} from '@mui/material';

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
          Guichet AutoEntrepreneur
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
