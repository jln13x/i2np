import { extendTheme, theme } from 'native-base';

export const nativeBaseTheme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    brand: '#4f46e5',
    error: theme.colors.rose[600],
  },
});

type NativeBaseThemeType = typeof nativeBaseTheme;

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends NativeBaseThemeType {}
}
