import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.color.gray_5};
    
    
  }
`;

export default GlobalStyle;
