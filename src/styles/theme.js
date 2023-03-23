import { transColor } from "../utils/transColor";

const color = {
  primary: "#56bea4",
  primary_l30: transColor.lighten("#56bea4", 0.3),

  black: "#000000",
  white: "#ffffff",
  gray_0: "#808080",
  gray_1: "#7e7e7e",
  gray_2: "#d9d9d9",
  gray_3: "#ededed",
  gray_4: "#f0f0f0",
  gray_5: "#f3f3f3",
  gray_6: "#fafafa",
  blue: "#3a66ff",
  red: "#ff3636",
  green: "#31bb00",
  orenge: "#ff852d",
  darkYellow: "#d1bf20",
};

// gray color는 디자이너님께서 디자인 시스템 완성하시면 추가하겠습니다.

const defaultTheme = {
  color,
};

export default defaultTheme;
