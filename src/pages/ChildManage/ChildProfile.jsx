import { useState } from "react";
import styled from "styled-components";
import textVariants from "../../styles/variants/textVariants";
import { DUMMY_PROFILE_IMG_SRC } from "../../assets";
import StyledChildManage from "./styled";

const ChildProfile = () => {
  const [isFixMode, setIsFixMode] = useState(true);

  return (
    <StyledProfile.Wrapper>
      <StyledChildManage.Title>원생 프로필</StyledChildManage.Title>
      <StyledProfile.ProfileBox>
        <img
          src={DUMMY_PROFILE_IMG_SRC}
          alt="profile"
          style={{ width: "120px" }}
        />
        <StyledProfile.InfoBox>
          <li>
            <StyledChildManage.SubTitle>이름</StyledChildManage.SubTitle>
            <span>김민재</span>
          </li>
          <li>
            <StyledChildManage.SubTitle>성별</StyledChildManage.SubTitle>
            <span>남자</span>
          </li>
          <li>
            <StyledChildManage.SubTitle>생년월일</StyledChildManage.SubTitle>
            <span>2015.12.07</span>
          </li>
        </StyledProfile.InfoBox>
      </StyledProfile.ProfileBox>
      <StyledChildManage.SubTitle>특이사항</StyledChildManage.SubTitle>
      <StyledProfile.SignificantArea
        readOnly={isFixMode}
        defaultValue="우리 아이는 너무 귀엽습니다."
      />
    </StyledProfile.Wrapper>
  );
};

export default ChildProfile;

const StyledProfile = {
  Wrapper: styled(StyledChildManage.Card)``,

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
