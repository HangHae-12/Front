import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE } from "../helpers/pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 페이지는 private route 를 적용하지  */}
        <Route path="/login" element={PAGE.login} />
        <Route path="/oauth/kakao/callback" element={PAGE.kakaoLogin} />
        {/* 모든 페이지에 공통 레이아웃 적용 */}
        <Route path="/" element={PAGE.layout}>
          <Route path="/signup" element={PAGE.signup.layout}>
            <Route index element={PAGE.signup.signup} />
            <Route path="search" element={PAGE.signup.search} />
            <Route path="teacher" element={PAGE.signup.teacher} />
            <Route path="parent" element={PAGE.signup.parent} />
            <Route path="success" element={PAGE.signup.success} />
          </Route>
          {/* 학급관리페이지 */}
          <Route path="/classes" element={PAGE.member} />
          <Route path="/classes/:id" element={PAGE.member} />
          {/* 출결관리페이지 */}
          <Route path="/host" element={PAGE.host} />
          <Route
            path="/host/:classroomId/:scheduleId?/:timeId?"
            element={PAGE.host}
          />
          {/* 출석부페이지 */}
          <Route path="/dayAttendance" element={PAGE.dayAttendance} />
          <Route path="/dayAttendance/:id" element={PAGE.dayAttendance} />
          <Route path="/monthAttendance" element={PAGE.monthAttendance} />
          <Route path="/monthAttendance/:sid" element={PAGE.monthAttendance} />
          {/* 멤버관리페이지 */}
          <Route path="/memberManage/" element={PAGE.memberManage} />
          <Route path="/memberManage/:id" element={PAGE.memberManage} />
          {/* 아이관리페이지 */}
          <Route path="/childmanage" element={PAGE.childmanage} />
          <Route path="/preview" element={PAGE.preview} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
