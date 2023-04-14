import { css } from "styled-components";
import textVariants from "./textVariants";

const buttonVariants = {
  Attendance: css`
    ${textVariants.Body1_SemiBold}
    width: 137.6px;
    height: 36.8px;
    padding: 6.4px 8px;
    border-radius: 8px;
  `,

  State: css`
    ${textVariants.Body2_SemiBold}
    width: 48px;
    height: 24px;
    padding: 4px;
    border-radius: 20px;
  `,

  NB_Button: css`
    ${textVariants.H3_SemiBold}
    width: 160px;
    height: 46px;
    padding: 8px 20px;
    border-radius: 4px;
  `,

  Filter_All: css`
    ${textVariants.Body1_SemiBold}
    height: 32px;
    padding: 10px 12px;
    border-radius: 4px;
  `,

  Time_Button: css`
    ${textVariants.Body1_SemiBold}
    width: 120px;
    height: 32px;
    padding: 4px 8px;
    border-radius: 24px;
    border: 1px solid #dadada;
  `,

  AB_Button: css`
    ${textVariants.Body1_SemiBold}
    width: 83px;
    height: 40px;
    padding: 12px 20px;
  `,
};

export default buttonVariants;
