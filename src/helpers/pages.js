import Login from "../pages/Login";
import KakaoLogin from "../pages/Login/KakaoLogin";
import Preview from "../pages/Preview";
import Host from "../pages/Host";
import Attendance from "../pages/Attendance/DayTable";
import MonthTable from "../pages/Attendance/MonthTable";
import Member from "../pages/Member/Member";
import Teacher from "../pages/Login/ExtraInfo/Teacher";
import Parent from "../pages/Login/ExtraInfo/Parent";
import ExtraInfo from "../pages/Login/ExtraInfo";
import ChildManage from "../pages/ChildManage";
import Layout from "../pages/Layout";

export const PAGE = {
  layout: <Layout />,
  preview: <Preview />,
  login: <Login />,
  extraInfo: {
    index: <ExtraInfo />,
    teacher: <Teacher />,
    parent: <Parent />,
  },

  kakaoLogin: <KakaoLogin />,
  host: <Host />,
  attendance: <Attendance />,
  attendance2: <MonthTable />,
  member: <Member />,
  childmanage: <ChildManage />,
};
