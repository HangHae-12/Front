import { useNavigate } from "react-router-dom";
import StyledLogin from "../styled";
import StyledSignup from "./styled";
import session from "../../../utils/session";
import { DUMMY_URL } from "../../../helpers/dummyUrl";

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
