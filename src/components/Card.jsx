import styled from "styled-components";
import { IoClose } from "react-icons/io5";

const StyledCard = {
  Container: styled.div`
    max-width: ${({ width }) => width || "min-content"};
    height: ${({ height }) => height || "min-content"};
    background-color: ${({ theme, bgcolor }) => bgcolor || theme.color.white};
    border-radius: 8px;
    padding: ${({ padding }) => padding || "2px"};
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
    color: ${({ theme }) => theme.color.gray_2};
  `,

  Icon: styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    transition: 0.2s ease;

    &:hover {
      border-radius: 50px;
      background-color: ${({ theme }) => theme.color.gray_3};
      cursor: pointer;
    }
  `,

  Content: styled.div`
    margin: 0 10px 10px;
    color: ${({ theme }) => theme.color.black};
    white-space: normal;
    overflow-wrap: break-word;
  `,
};

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
      {isClosedIcon ? (
        <StyledCard.Icon>
          <IoClose />
        </StyledCard.Icon>
      ) : null}
    </StyledCard.Header>
  );
};
const Title = ({ children }) => {
  return <StyledCard.Title>{children}</StyledCard.Title>;
};

const Contents = ({ children }) => {
  return <StyledCard.Content>{children}</StyledCard.Content>;
};

Card.Header = Header;
Card.Title = Title;
Card.Contents = Contents;

export default Card;