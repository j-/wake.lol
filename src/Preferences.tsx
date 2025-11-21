import Box from '@mui/material/Box';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useId, useRef, useState } from 'react';
import { ColorCodeDialog } from './ColorCodeDialog';
import { useAppContext } from './controller';
import { IconHash, IconPalette, IconPipette, IconUndo } from './icons';
import { useEyeDropper } from './use-eye-dropper';

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

const ColorSwatch = styled('span')(({ theme }) => ({
  width: theme.spacing(18 / 8),
  height: theme.spacing(18 / 8),
  margin: theme.spacing(1),
  borderRadius: theme.spacing(2 / 8),
}));

export const Preferences = () => {
  const id = useId();
  const colorInputId = `Preferences-color-${id}`;
  const colorInputRef = useRef<HTMLInputElement>(null);

  const [colorCodeDialogOpen, setColorCodeDialogOpen] = useState(false);

  const {
    shouldAcquireOnLoad,
    setShouldAcquireOnLoad,
    shouldAcquireOnVisibilityChange,
    setShouldAcquireOnVisibilityChange,
    canPictureInPicture,
    shouldOpenPiPOnInactive,
    setShouldOpenPiPOnInactive,
    themeColor,
    setThemeColor,
    resetThemeColor,
  } = useAppContext();

  const { eyeDropper, open } = useEyeDropper();

  return (
    <>
      <ColorCodeDialog
        open={colorCodeDialogOpen}
        colorCode={themeColor}
        onClose={() => {
          setColorCodeDialogOpen(false);
        }}
        onSubmit={(_, newColor) => {
          setThemeColor(newColor);
          setColorCodeDialogOpen(false);
        }}
      />

      <FormGroup sx={{ display: 'inline-flex', gap: { xs: 1, sm: 2} }}>
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

        {canPictureInPicture ? (
          <FormControlLabel
            label="Launch picture-in-picture mode when main window is hidden"
            control={
              <Checkbox
                checked={shouldOpenPiPOnInactive}
                onChange={(e) => {
                  setShouldOpenPiPOnInactive(e.currentTarget.checked);
                }}
              />
            }
          />
        ) : null}

        <FormControlLabel
          label={
            <Box display="flex" alignItems="center" gap={1}>
              <span>Wake lock indicator color</span>

              <Tooltip title="Select color">
                <IconButton size="small" onClick={() => {
                  colorInputRef.current?.click();
                }}>
                  <IconPalette size={16} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Enter color code">
                <IconButton size="small" onClick={() => {
                  setColorCodeDialogOpen(true);
                }}>
                  <IconHash size={16} />
                </IconButton>
              </Tooltip>

              {eyeDropper ? (
                <Tooltip title="Pick color from screen">
                  <IconButton size="small" onClick={async () => {
                    try {
                      const { sRGBHex } = await open();
                      setThemeColor(sRGBHex);
                    } catch {}
                  }}>
                    <IconPipette size={16} />
                  </IconButton>
                </Tooltip>
              ) : null}

              <Tooltip title="Reset color to default">
                <IconButton size="small" onClick={resetThemeColor}>
                  <IconUndo size={16} />
                </IconButton>
              </Tooltip>
            </Box>
          }
          htmlFor={colorInputId}
          control={
            <ColorCheckboxRoot>
              <Checkbox
                icon={<ColorSwatch style={{ backgroundColor: themeColor }} />}
                checkedIcon={<ColorSwatch style={{ backgroundColor: themeColor }} />}
                onClick={(e) => {
                  e.preventDefault();
                  colorInputRef.current?.click();
                }}
              />
              <HiddenColorInput
                ref={colorInputRef}
                id={colorInputId}
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.currentTarget.value)}
              />
            </ColorCheckboxRoot>
          }
        />
      </FormGroup>
    </>
  );
};
