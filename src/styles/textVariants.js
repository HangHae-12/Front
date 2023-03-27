import { css } from "styled-components";

const textVariants = {
  H1: css`
    font-size: ${({ theme }) => theme.fontSize.h1};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,

  H2_Bold: css`
    font-size: ${({ theme }) => theme.fontSize.h2};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,

  H2_SemiBold: css`
    font-size: ${({ theme }) => theme.fontSize.h2};
    font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  `,

  H3_Bold: css`
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,

  H3_SemiBold: css`
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  `,

  Body1_Bold: css`
    font-size: ${({ theme }) => theme.fontSize.body1};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,

  Body1_SemiBold: css`
    font-size: ${({ theme }) => theme.fontSize.body1};
    font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  `,

  Body2_Bold: css`
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,

  Body2_SemiBold: css`
    font-size: ${({ theme }) => theme.fontSize.body2};
    font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  `,

  Body3_SemiBold: css`
    font-size: ${({ theme }) => theme.fontSize.body3};
    font-weight: ${({ theme }) => theme.fontWeight.semi_bold};
  `,

  Body3_Medium: css`
    font-size: ${({ theme }) => theme.fontSize.body3};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  `,

  Body3_Regular: css`
    font-size: ${({ theme }) => theme.fontSize.body3};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  `,

  Caption: css`
    font-size: ${({ theme }) => theme.fontSize.caption};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  `,
};

export default textVariants;