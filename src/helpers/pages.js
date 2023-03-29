import Login from "../pages/Login";
import KakaoLogin from "../pages/Login/kakao/KakaoLogin";
import Preview from "../pages/Preview";
import Host from "../pages/Host/Host";
import Member from "../pages/Member/Member";
import SignupTeacher from "../pages/Login/SignupTeacher";
import SignupParant from "../pages/Login/SignupParant";
import Signup from "../pages/Login/Signup";

export const PAGE = {
  preview: <Preview />,
  login: <Login />,
  signup: <Signup />,
  kakaoLogin: <KakaoLogin />,
  host: <Host />,
  member: <Member />,

  signupTeacher: <SignupTeacher />,
  signupParant: <SignupParant />,
};
