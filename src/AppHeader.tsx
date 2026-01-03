import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { type FC } from 'react';
import { APP_NAME, BASE_URL, SKEOH_URL } from './constants';

export const AppHeader: FC = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    data-testId="AppHeader"
  >
    <Typography component="h1" variant="h4">
      <Link href={BASE_URL} color="inherit" sx={{ textDecoration: 'none' }}>
        {APP_NAME}
      </Link>
    </Typography>

    <Link
      href={SKEOH_URL}
      color="inherit"
      underline="none"
      target="_blank"
      sx={{
        opacity: 0.5,
        transition: (theme) => theme.transitions.create(['opacity']),
        '&:hover, &:focus': {
          opacity: 1,
        },
      }}
    >
      skeoh.com
    </Link>
  </Box>
);
