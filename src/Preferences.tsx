import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { useAppContext } from './controller';

const ColorCheckboxRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  [`& .${checkboxClasses.root}`]: {
    padding: theme.spacing(0.5),
  },
}));

const HiddenColorInput = styled('input')({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  cursor: 'pointer',
});

// Small square that shows the current color inside checkbox frame
const ColorSwatch = styled('span')(({ theme }) => ({
  width: theme.spacing(18 / 8),
  height: theme.spacing(18 / 8),
  margin: theme.spacing(1),
  borderRadius: theme.spacing(2 / 8),
}));

export const Preferences = () => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const {
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    themeColor,
    setThemeColor,
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

      <FormControlLabel
        label="Wake lock indicator color"
        htmlFor="Preferences-color"
        control={
          <ColorCheckboxRoot>
            <Checkbox
              // Reuse checkbox styles; no separate input[type=color] styling
              // We render the swatch as both icon & checkedIcon so size/focus/hover are identical.
              icon={<ColorSwatch style={{ backgroundColor: themeColor }} />}
              checkedIcon={<ColorSwatch style={{ backgroundColor: themeColor }} />}
              // This input is visually there, but actual color picking is handled by the overlaid input.
              // Optionally disable ripple if you don't want double feedback.
              // disableRipple
              onClick={(e) => {
                e.preventDefault();
                colorInputRef.current?.click();
              }}
            />
            <HiddenColorInput
              ref={colorInputRef}
              id="Preferences-color"
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.currentTarget.value)}
            />
          </ColorCheckboxRoot>
        }
      />
    </FormGroup>
  );
};
