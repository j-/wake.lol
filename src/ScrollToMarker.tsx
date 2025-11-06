import { styled } from '@mui/material/styles';

export const ScrollToMarker = styled('a')({
  display: 'block',
  marginTop: 'calc(var(--peek-height) * -1)',
  marginBottom: 'var(--peek-height)',
});
