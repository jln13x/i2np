import { extendTheme } from 'native-base';

export const nativeBaseTheme = extendTheme({
  config: {
    initialColorMode: 'light',
  },
  colors: {
    brand: '#4f46e5',
  },
});

type NativeBaseThemeType = typeof nativeBaseTheme;

declare module 'native-base' {
  interface ICustomTheme extends NativeBaseThemeType {}
}
