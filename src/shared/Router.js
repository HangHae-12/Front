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
        {/*  */}
        <Route path="/signup" element={PAGE.signup.layout}>
          <Route index element={PAGE.signup.signup} />
          <Route path="teacher" element={PAGE.signup.teacher} />
          <Route path="parent" element={PAGE.signup.parent} />
        </Route>

        <Route path="/classes" element={PAGE.member} />
        <Route path="/classes/:id" element={PAGE.member} />
        <Route path="/host" element={PAGE.host} />
        <Route path="/dayAttendance" element={PAGE.dayAttendance} />
        <Route path="/dayAttendance/:id" element={PAGE.dayAttendance} />
        <Route path="/monthAttendance" element={PAGE.monthAttendance} />
        <Route path="/monthAttendance/:id" element={PAGE.dayAttendance} />
        <Route
          path="/host/:classroomId/:scheduleId?/:timeId?"
          element={PAGE.host}
        />
        <Route path="/" element={PAGE.layout}>
          {/* layout 컴포넌트를 전체 적용시킬 수 있도록 수정할 것. */}
          <Route path="/childmanage" element={PAGE.childmanage} />
          <Route path="/preview" element={PAGE.preview} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
