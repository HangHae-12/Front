import { transColor } from "../utils/transColor";

const grayScale = {
  800: "#2c2c2c",
  700: "#383838",
  600: "#424242",
  500: "#757575",
  400: "#9e9e9e",
  300: "#bdbdbd",
  200: "#dadada",
  100: "#e9e9e9",
  50: "#f8f8f8",
  25: "#fdfdfd",
};

const color = {
  black: "#212121",
  white: "#ffffff",
  primary: "#56bea4",
  primary_l30: transColor.lighten("#56bea4", 0.3),
  blue: "#567bff",
  red: "#f35451",
  orange: "#ff852d",
  yellow: "#ffd600",
  green: transColor.lighten("#00c814", 0.4),
  perple: "#9747ff",
  grayScale: grayScale,
};

const fontSize = {
  h1: "30px",
  h2: "24px",
  h3: "20px",
  body1: "16px",
  body2: "14px",
  body3: "12px",
  caption: "10px",
};

const fontWeight = {
  bold: 700,
  semi_bold: 600,
  medium: 500,
  regular: 400,
};

const defaultTheme = {
  color,
  fontSize,
  fontWeight,
};

export default defaultTheme;
