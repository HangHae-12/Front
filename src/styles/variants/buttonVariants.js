import { css } from "styled-components";
import textVariants from "./textVariants";

const buttonVariants = {
  Attendance: css`
    ${textVariants.Body1_SemiBold}
    width: 172px;
    height: 40px;
    padding: 8px 10px;
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
    ${textVariants.H2_SemiBold}
    width: 200px;
    height: 60px;
    padding: 12px 10px;
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
    width: 140px;
    padding: 8px 12px;
    border-radius: 24px;
  `,

  AB_Button: css`
    ${textVariants.H3_SemiBold}
    padding: 12px 20px;
  `,
};

export default buttonVariants;
