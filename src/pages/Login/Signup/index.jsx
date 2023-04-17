import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Buttons from "../../../components/Buttons";
import StyledLogin from "../styled";
import { DUMMY_URL } from "../../../helpers/dummyUrl";
import session from "../../../utils/session";

const Signup = () => {
  const navigate = useNavigate();
  const user = session.get("user");

  const role = [
    { role: "parent", label: "학부모" },
    { role: "teacher", label: "선생님" },
    { role: "principal", label: "원장선생님" },

  ];

  const handleLinkNextPage = (role) => {
    session.set("user", { ...user, role });

    if (role === "principal") {
      navigate(`./${role}`);
    } else {
      navigate("./search");
    }
  };

  return (
    <StyledSignup.Container>
      <StyledSignup.ProfileWrapper>
        <img
          src={user.profileImageUrl ?? DUMMY_URL.not_profile_img}
          alt="프로필_이미지"
        />
        <StyledSignup.TitleWrapper>
          <StyledLogin.Title>안녕하세요</StyledLogin.Title>
          <StyledLogin.Title>
            <strong>{user.name}</strong>님은
          </StyledLogin.Title>
          <StyledLogin.Title>어떤 분 이신가요?</StyledLogin.Title>
        </StyledSignup.TitleWrapper>
      </StyledSignup.ProfileWrapper>
      <StyledSignup.LinkWrapper>
        <StyledSignup.BtnBox>
          {role.map((role) => (
            <StyledSignup.Btn
              key={`${role.label}`}
              onClick={() => handleLinkNextPage(role.role)}
              colorTypes="primary"
              outlined
            >
              {role.label}
            </StyledSignup.Btn>
          ))}
        </StyledSignup.BtnBox>
        <StyledLogin.Title>입니다.</StyledLogin.Title>
      </StyledSignup.LinkWrapper>
    </StyledSignup.Container>
  );
};
export default Signup;

const StyledSignup = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 80px 200px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  `,
  ProfileWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `,

  TitleWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  LinkWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    h3 {
      text-align: end;
    }
  `,

  BtnBox: styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin-top: 36px;
  `,

  Btn: styled(Buttons.NB)`
    border-radius: 8px;
    width: min-content;
  `,
};
