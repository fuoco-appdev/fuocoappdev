import { ColorSchemeName, Appearance } from 'react-native';

export class Theme {
  static getTheme(): ColorSchemeName {
    return Appearance.getColorScheme();
  }

  static setTheme(value: ColorSchemeName): void {
    Appearance.setColorScheme(value);
  }
}
