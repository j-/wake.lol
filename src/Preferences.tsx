import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useAppContext } from './controller';

export const Preferences = () => {
  const {
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
  } = useAppContext();

  return (
    <FormGroup sx={{ display: 'inline-flex' }}>
      <FormControlLabel
        label="Re-enable wake lock automatically"
        control={
          <Checkbox
            checked={shouldAcquireOnVisibilityChange}
            onChange={(e) => {
              setShouldAcquireOnVisibilityChange(e.currentTarget.checked);
            }}
          />
        }
      />

      <FormControlLabel
        label="Enable wake lock on startup"
        control={
          <Checkbox
            checked={shouldAcquireOnLoad}
            onChange={(e) => {
              setShouldAcquireOnLoad(e.currentTarget.checked);
            }}
          />
        }
      />
    </FormGroup>
  );
};
