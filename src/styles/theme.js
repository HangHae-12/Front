import { COLOR } from "../helpers/color";
import { transColor } from "../utils/transColor";

const color = {
  primary: COLOR.primary,
  primary_l30: transColor.lighten(COLOR.primary, 0.3),

  black: COLOR.grayScale[900],
  gray_800: COLOR.grayScale[800],
  gray_700: COLOR.grayScale[700],
  gray_600: COLOR.grayScale[600],
  gray_500: COLOR.grayScale[500],
  gray_400: COLOR.grayScale[400],
  gray_300: COLOR.grayScale[300],
  gray_200: COLOR.grayScale[200],
  gray_100: COLOR.grayScale[100],
  gray_50: COLOR.grayScale[50],
  white: COLOR.grayScale[0],
  blue: COLOR.blue,
  red: COLOR.red,
  orange: COLOR.orange,
  yellow: COLOR.yellow,
  green: transColor.lighten(COLOR.green, 0.4),
};

const defaultTheme = {
  color,
};

export default defaultTheme;
