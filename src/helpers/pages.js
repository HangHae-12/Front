import React, { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const KakaoLogin = lazy(() => import("../pages/Login/KakaoLogin"));
const KakaoUnlinked = lazy(() => import("../pages/Login/KakaoUnlinked"));
const Main = lazy(() => import("../pages/Main"));
const Host = lazy(() => import("../pages/Host"));
const DayTable = lazy(() => import("../pages/Attendance/DayTable"));
const MonthTable = lazy(() => import("../pages/Attendance/MonthTable"));
const MemberManage = lazy(() => import("../pages/MemberManage"));
const Member = lazy(() => import("../pages/Member/Member"));
const SignupLayout = lazy(() => import("../pages/Login/Signup/Layout"));
const Signup = lazy(() => import("../pages/Login/Signup"));
const Teacher = lazy(() => import("../pages/Login/User/Teacher"));
const Parent = lazy(() => import("../pages/Login/User/Parent"));
const Principal = lazy(() => import("../pages/Login/User/Principal"));
const SignupSuccess = lazy(() => import("../pages/Login/Signup/SignupSuccess"));
const Search = lazy(() => import("../pages/Login/Search"));
const Registration = lazy(() => import("../pages/Login/Registration"));
const ChildManage = lazy(() => import("../pages/ChildManage"));
const Layout = lazy(() => import("../pages/Layout"));
const KindergartenInfo = lazy(() =>
  import("../pages/Login/Registration/KindergartenInfo")
);
const ClassRegistration = lazy(() =>
  import("../pages/Login/Registration/ClassRegistration")
);

export const PAGE = {
  layout: <Layout />,
  main: <Main />,
  login: <Login />,
  kakaoLogin: <KakaoLogin />,
  KakaoUnlinked: <KakaoUnlinked />,
  signup: {
    layout: <SignupLayout />,
    signup: <Signup />,
    search: <Search />,
    teacher: <Teacher />,
    parent: <Parent />,
    success: <SignupSuccess />,
    principal: <Principal />,
    registration: <Registration />,
    info: <KindergartenInfo />,
    class: <ClassRegistration />,
  },

  host: <Host />,
  dayAttendance: <DayTable />,
  monthAttendance: <MonthTable />,
  memberManage: <MemberManage />,
  member: <Member />,
  childmanage: <ChildManage />,
};
