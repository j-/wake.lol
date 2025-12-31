import { useMemo, type FC } from 'react';

export type AppIconProps = {
  isActive: boolean;
  color: string;
  bgColor: string;
};

export const AppIcon: FC<AppIconProps> = ({
  isActive,
  color,
  bgColor,
}) => {
  const iconSrc = useMemo(() => {
    const svgString = [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="${color}">`,
      `<rect width="24" height="24" rx="4" ry="4" fill="${bgColor}" stroke="none" />`,
      isActive ?
        [
          '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />',
          '<circle cx="12" cy="12" r="3" />',
        ].join('') :
        [
          '<path d="m15 18-.722-3.25" />',
          '<path d="M2 8a10.645 10.645 0 0 0 20 0" />',
          '<path d="m20 15-1.726-2.05" />',
          '<path d="m4 15 1.726-2.05" />',
          '<path d="m9 18 .722-3.25" />',
        ].join(''),
      '</svg>',
    ].join('');

    return `data:image/svg+xml,${encodeURIComponent(svgString)}`;
  }, [isActive, bgColor, color]);

  return <link rel="icon favicon" href={iconSrc} type="image/svg+xml" sizes="any" />;
};
