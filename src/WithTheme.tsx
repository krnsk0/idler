import { ThemeProvider } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { darkTheme, lightTheme } from './globalStyles';
import { ColorThemes } from './store/game';
import { useStore } from './store/Provider';

interface WithThemeProps {
  children: React.ReactNode;
}

export const WithTheme = observer(({ children }: WithThemeProps) => {
  const {
    game: { colorTheme },
  } = useStore();

  let selctedTheme = lightTheme;
  if (colorTheme === ColorThemes.DARK) {
    selctedTheme = darkTheme;
  } else if (colorTheme === ColorThemes.LIGHT) {
    selctedTheme = lightTheme;
  }

  return <ThemeProvider theme={selctedTheme}>{children}</ThemeProvider>;
});
