import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE } from "../helpers/pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={PAGE.login} />
        <Route path="/oauth/kakao/callback" element={PAGE.kakaoLogin} />
        {/* <Route path="/" element={< />} /> */}
        <Route path="/extrainfo" element={PAGE.extraInfo.index}>
          <Route path="teacher" element={PAGE.extraInfo.teacher} />
          <Route path="parent" element={PAGE.extraInfo.parent} />
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
