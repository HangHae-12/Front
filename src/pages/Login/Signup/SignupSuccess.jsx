import { useEffect } from "react";
import styled from "styled-components";
import { IoAlertCircle } from "react-icons/io5";
import StyledLogin from "../styled";
import { DUMMY_URL } from "../../../helpers/dummyUrl";
import session from "../../../utils/session";
import textVariants from "../../../styles/variants/textVariants";

const SignupSuccess = () => {
  const { name, profileImageUrl, kindergartenName, logoImageUrl, role } =
    session.get("user");

  useEffect(() => {
    return () => {
      session.clear();
    };
  }, []);

  return (
    <StyledSignupSuccess.Container>
      <StyledSignupSuccess.MessageWrapper>
        <img
          src={profileImageUrl ?? DUMMY_URL.not_profile_img}
          alt="프로필_이미지"
        />
        <StyledSignupSuccess.MessageBox>
          <StyledLogin.Title>
            🎉 축하합니다 <strong>{name}</strong> 님!
          </StyledLogin.Title>
          <StyledLogin.Title>회원가입이 완료되었습니다.</StyledLogin.Title>
        </StyledSignupSuccess.MessageBox>
      </StyledSignupSuccess.MessageWrapper>
      <StyledSignupSuccess.InfoWrapper>
        <StyledSignupSuccess.InfoContents>
          <h4>접수 유치원</h4>
          <StyledSignupSuccess.KindergartenInfo>
            <img src={logoImageUrl} alt="유치원_로고" />
            <p>{kindergartenName}</p>
          </StyledSignupSuccess.KindergartenInfo>
        </StyledSignupSuccess.InfoContents>
        <StyledSignupSuccess.InfoContents>
          <h4>요청 권한</h4>
          <p>{role === "EARLY_PARENT" ? "부모님" : "선생님"}</p>
        </StyledSignupSuccess.InfoContents>
      </StyledSignupSuccess.InfoWrapper>
      <StyledSignupSuccess.AlertWrapper>
        <IoAlertCircle />
        <p>해당 유치원에서 승인이 완료되면 서비스 이용이 가능합니다.</p>
      </StyledSignupSuccess.AlertWrapper>
    </StyledSignupSuccess.Container>
  );
};

export default SignupSuccess;

const StyledSignupSuccess = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 110px 0px;

    strong {
      color: ${({ theme }) => theme.color.primary};
    }
  `,
  MessageWrapper: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    gap: 24px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  `,
  MessageBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  InfoWrapper: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    gap: 8px;
    width: 365px;
    padding: 20px;
    background: ${({ theme }) => theme.color.green_darker};
    border-radius: 4px;
  `,

  InfoContents: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 36px;

    h4 {
      ${textVariants.Body2_Bold}
      color:${({ theme }) => theme.color.grayScale[400]}
    }

    p {
      ${textVariants.Body1_SemiBold}
    }
  `,
  KindergartenInfo: styled.div`
    display: flex;
    align-items: center;
    width: 218px;
    height: 100%;
    gap: 12px;
    padding: 4px 24px;
    border: 1px solid ${({ theme }) => theme.color.grayScale[200]};
    border-radius: 4px;
    background: ${({ theme }) => theme.color.white};
    img {
      width: 28px;
      height: 28px;
      border-radius: 4px;
    }

    p {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  `,

  AlertWrapper: styled.div`
    ${textVariants.Body2_Bold}
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.color.primary};

    svg {
      width: 24px;
      height: 24px;
    }
  `,
};
