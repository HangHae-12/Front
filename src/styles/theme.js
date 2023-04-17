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
  // primary_l30: lighten(0.3, "#56bea4"),
  // primary_l30 을 사용한 모든 색상에 primary opacity 0.3 으로 변경할 것
  blue: "#567bff",
  blue_lighter: "#eef2ff",
  red: "#f35451",
  red_lighter: "#feeeee",
  orange: "#ff852d",
  orange_lighter: "#fff3ea",
  yellow: "#ffd600",
  green: "#86e49b",
  // green_darker: "#fefffe",
  green_darker: "#F1F7F1",
  perple: "#9747ff",
  perple_lighter: "#f5edff",
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
const device = {
  mobile: "(max-width: 768px)",
  laptop: "(min-width: 992px) and (max-width: 1390px)",
  desktop: "(min-width: 1800px)",
};
const defaultTheme = {
  color,
  fontSize,
  fontWeight,
  device,
};

export default defaultTheme;
