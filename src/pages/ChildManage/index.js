import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";

const ChildManage = () => {
  return (
    <StyledChildManage.Container>
      <StyledChildManage.Header>아이 관리</StyledChildManage.Header>
      <StyledChildManage.Section>
        <StyledCard>
          <StyledChildManage.Title>원생 프로필</StyledChildManage.Title>
        </StyledCard>
        <StyledCard></StyledCard>
      </StyledChildManage.Section>
    </StyledChildManage.Container>
  );
};

export default ChildManage;

const StyledCard = styled.div`
  border-radius: 12px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
`;

const StyledChildManage = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 70px 150px;
  `,
  Header: styled.h2`
    ${textVariants.H2_Bold}
    color: ${({ theme }) => theme.color.grayScale[600]};
    margin-bottom: 32px;
  `,

  Section: styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 580px;
    gap: 24px;
    border: 1px solid black;
  `,

  Title: styled.h3`
    ${textVariants.Body1_Bold}
    color: ${({ theme }) => theme.color.grayScale[700]};
  `,
};
