import { useState } from "react";
import styled from "styled-components";
import { DUMMY_PROFILE_IMG_SRC } from "../../assets";
import Dropdown from "../../components/Dropdown";
import textVariants from "../../styles/variants/textVariants";

const ChildManage = () => {
  const [isFixMode, setIsFixMode] = useState(true);
  // 수정모드 로직에 대해서 고민해볼 것.
  // 아예 readOnly input -> hook form 으로 처리할건지 아니면 이대로 갈건지

  return (
    <StyledChildManage.Container>
      <StyledChildManage.Header>아이 관리</StyledChildManage.Header>
      <StyledChildManage.Section>
        <StyledCard>
          <StyledChildManage.Title>원생 프로필</StyledChildManage.Title>
          <StyledChildManage.ProfileBox>
            <img
              src={DUMMY_PROFILE_IMG_SRC}
              alt="profile"
              style={{ width: "120px" }}
            />
            <StyledChildManage.InfoBox>
              <li>
                <StyledChildManage.SubTitle>이름</StyledChildManage.SubTitle>
                <span>김민재</span>
              </li>
              <li>
                <StyledChildManage.SubTitle>성별</StyledChildManage.SubTitle>
                <span>남자</span>
              </li>
              <li>
                <StyledChildManage.SubTitle>
                  생년월일
                </StyledChildManage.SubTitle>
                <span>2015.12.07</span>
              </li>
            </StyledChildManage.InfoBox>
          </StyledChildManage.ProfileBox>
          <StyledChildManage.SubTitle>특이사항</StyledChildManage.SubTitle>
          <StyledChildManage.SignificantArea
            readOnly={isFixMode}
            defaultValue="우리 아이는 너무 귀엽습니다."
          />
        </StyledCard>
        <StyledCard>
          <Dropdown buttonLabel="09시~10시" isReadOnly={false}>
            <Dropdown.Item onClick={() => console.log("Option 1")}>
              Option 1
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Option 2")}>
              Option 2
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Option 3")}>
              Option 3
            </Dropdown.Item>
          </Dropdown>
        </StyledCard>
      </StyledChildManage.Section>
    </StyledChildManage.Container>
  );
};

export default ChildManage;

const StyledCard = styled.div`
  width: 100%;
  border-radius: 12px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
`;

const StyledChildManage = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    padding: 70px 70px 0 150px;
  `,
  Header: styled.h2`
    ${textVariants.H2_Bold}
    color: ${({ theme }) => theme.color.grayScale[600]};
    margin-bottom: 32px;
  `,

  Section: styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 580px;
    gap: 24px;
  `,

  Title: styled.h3`
    ${textVariants.Body1_Bold}
    color: ${({ theme }) => theme.color.grayScale[700]};
    opacity: 0.8;
  `,

  SubTitle: styled.p`
    ${textVariants.Body2_SemiBold}
    color: ${({ theme }) => theme.color.grayScale[500]};
    opacity: 0.8;
  `,

  ProfileBox: styled.div`
    width: 100%;
    height: 120px;
    /* height: min-content; */
    margin: 24px 0px;
    display: flex;
    flex-direction: row;
    gap: 90px;
  `,

  InfoBox: styled.ul`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;

    li {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }

    p,
    span {
      padding: 10px;
    }

    span {
      ${textVariants.Body1_SemiBold}
      color: ${({ theme }) => theme.color.grayScale[500]};
      background-color: ${({ theme }) => theme.color.grayScale[50]};
    }
  `,

  SignificantArea: styled.textarea`
    width: 100%;
    height: 200px;
    background-color: ${({ theme }) => theme.color.grayScale[50]};
    margin-top: 7px;
    border: none;
    resize: none;
    outline: none;
    padding: 10px;
  `,
};
