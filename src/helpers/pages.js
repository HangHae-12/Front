import Login from "../pages/Login";
import KakaoLogin from "../pages/Login/KakaoLogin";
import Preview from "../pages/Preview";
import Host from "../pages/Host";
import DayTable from "../pages/Attendance/DayTable";
import MonthTable from "../pages/Attendance/MonthTable";
import MemberManage from "../pages/MemberManage";
import Member from "../pages/Member/Member";
import SignupLayout from "../pages/Login/Signup/Layout";
import Signup from "../pages/Login/Signup";
import Teacher from "../pages/Login/Signup/Info/Teacher";
import Parent from "../pages/Login/Signup/Info/Parent";

import ChildManage from "../pages/ChildManage";
import Layout from "../pages/Layout";
import SignupSuccess from "../pages/Login/Signup/SignupSuccess";
import Search from "../pages/Login/Signup/Info/Search";
import Principal from "../pages/Login/Signup/Info/Principal";

export const PAGE = {
  layout: <Layout />,
  preview: <Preview />,
  login: <Login />,
  signup: {
    layout: <SignupLayout />,
    signup: <Signup />,
    search: <Search />,
    teacher: <Teacher />,
    parent: <Parent />,
    principal: <Principal />,
    success: <SignupSuccess />,
  },

  kakaoLogin: <KakaoLogin />,
  host: <Host />,
  dayAttendance: <DayTable />,
  monthAttendance: <MonthTable />,
  memberManage: <MemberManage />,
  member: <Member />,
  childmanage: <ChildManage />,
};
