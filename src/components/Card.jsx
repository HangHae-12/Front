import styled from "styled-components";

const Card = ({ children, width, bgcolor, padding }) => {
  return (
    <StyledCard.Container width={width} bgcolor={bgcolor} padding={padding}>
      {children}
    </StyledCard.Container>
  );
};

const Header = ({ children, isClosedIcon }) => {
  return (
    <StyledCard.Header>
      {children}
      {isClosedIcon && <StyledCard.Icon>&times;</StyledCard.Icon>}
    </StyledCard.Header>
  );
};
const Title = ({ children }) => {
  return <StyledCard.Title>{children}</StyledCard.Title>;
};

const Contents = ({ children }) => {
  return <StyledCard.Content>{children}</StyledCard.Content>;
};

const StyledCard = {
  Container: styled.div`
    max-width: ${({ width }) => width ?? "min-content"};
    max-height: ${({ height }) => height ?? "min-content"};
    background-color: ${({ theme, bgcolor }) =>
      bgcolor ?? theme.color.grayScale[50]};
    border-radius: 8px;
    padding: ${({ padding }) => padding ?? "2px"};
  `,

  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  `,

  Title: styled.span`
    font-weight: 900;
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray_200};
  `,

  Icon: styled.span`
    font-size: 20px;
  `,

  Content: styled.div`
    margin: 0 10px 10px;
    color: ${({ theme }) => theme.color.black};
    white-space: normal;
    overflow-wrap: break-word;
  `,
};

Card.Header = Header;
Card.Title = Title;
Card.Contents = Contents;

export default Card;
