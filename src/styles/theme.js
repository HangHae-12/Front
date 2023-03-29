import { darken, lighten } from "polished";

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
  primary: "#3cc678",
  primary_l30: lighten(0.3, "#56bea4"),
  // primary_l30 을 사용한 모든 색상에 primary opacity 0.3 으로 변경할 것
  blue: "#567bff",
  red: "#f35451",
  orange: "#ff852d",
  yellow: "#ffd600",
  // green: lighten(0.4, "#00c814"),
  green: "#99e9a1",
  green_darker: "#edf5eecc",
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
