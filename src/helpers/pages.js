import Login from "../pages/Login";
import KakaoLogin from "../pages/Login/KakaoLogin";
import KakaoUnlinked from "../pages/Login/KakaoUnlinked";
import Preview from "../pages/Preview";
import Host from "../pages/Host";
import DayTable from "../pages/Attendance/DayTable";
import MonthTable from "../pages/Attendance/MonthTable";
import MemberManage from "../pages/MemberManage";
import Member from "../pages/Member/Member";

import SignupLayout from "../pages/Login/Signup/Layout";
import Signup from "../pages/Login/Signup";
import Teacher from "../pages/Login/User/Teacher";
import Parent from "../pages/Login/User/Parent";
import Principal from "../pages/Login/User/Principal";
import SignupSuccess from "../pages/Login/Signup/SignupSuccess";
import Search from "../pages/Login/Search";
import Registration from "../pages/Login/Registration";
import ChildManage from "../pages/ChildManage";
import Layout from "../pages/Layout";
import KindergartenInfo from "../pages/Login/Registration/KindergartenInfo";
import ClassRegistration from "../pages/Login/Registration/ClassRegistration";

export const PAGE = {
  layout: <Layout />,
  preview: <Preview />,
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
