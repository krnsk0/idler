import { ThemeProvider } from '@emotion/react';
import { theme } from './globalStyles';
import { ColorThemes } from './store/gui/gui';
import { useStore } from './store/Provider';

interface WithThemeProps {
  children: React.ReactNode;
}

export const WithTheme = ({ children }: WithThemeProps) => {
  const {
    gui: { colorTheme },
  } = useStore();

  let selctedTheme = theme;
  if (colorTheme === ColorThemes.DARK) {
    selctedTheme = theme;
  } else if (colorTheme === ColorThemes.LIGHT) {
    selctedTheme = theme;
  }

  return <ThemeProvider theme={selctedTheme}>{children}</ThemeProvider>;
};
