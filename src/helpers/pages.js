import Login from "../pages/Login";
import KakaoLogin from "../pages/Login/KakaoLogin";
import Preview from "../pages/Preview";
import Host from "../pages/Host";
import DayTable from "../pages/Attendance/DayTable";
import MonthTable from "../pages/Attendance/MonthTable";
import Member from "../pages/Member/Member";
import SignupLayout from "../pages/Login/Signup/Layout";
import Signup from "../pages/Login/Signup";
import Teacher from "../pages/Login/Signup/Teacher";
import Parent from "../pages/Login/Signup/Parent";

import ChildManage from "../pages/ChildManage";
import Layout from "../pages/Layout";
import SignupSuccess from "../pages/Login/Signup/SignupSuccess";

export const PAGE = {
  layout: <Layout />,
  preview: <Preview />,
  login: <Login />,
  signup: {
    layout: <SignupLayout />,
    signup: <Signup />,
    teacher: <Teacher />,
    parent: <Parent />,
    success: <SignupSuccess />,
  },

  kakaoLogin: <KakaoLogin />,
  host: <Host />,
  dayAttendance: <DayTable />,
  monthAttendance: <MonthTable />,
  member: <Member />,
  childmanage: <ChildManage />,
};
