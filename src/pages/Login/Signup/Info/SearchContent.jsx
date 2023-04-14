import styled from "styled-components";
import textVariants from "../../../../styles/variants/textVariants";

const SearchContent = ({ data, handleSelectKinder }) => {
  return (
    <StyledSearchContent.Container
      key={data.id}
      onClick={() => {
        return handleSelectKinder ? handleSelectKinder(data) : null;
      }}
    >
      <img src={data?.logoImageUrl ?? ""} alt="로고_이미지" />
      <StyledSearchContent.InfoWrapper>
        <h3>{data?.name}</h3>
        <p>{data?.address}</p>
      </StyledSearchContent.InfoWrapper>
    </StyledSearchContent.Container>
  );
};

export default SearchContent;

const StyledSearchContent = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 74px;
    padding: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 29px;
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
    border-radius: 4px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
    }
    &:hover {
      border-color: ${({ theme }) => theme.color.primary};
    }
  `,

  InfoWrapper: styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    h3 {
      ${textVariants.Body1_SemiBold}
      color: ${({ theme }) => theme.color.grayScale[600]}
    }
    p {
      ${textVariants.Body2_Bold}
      color: ${({ theme }) => theme.color.grayScale[500]}
    }
  `,
};
