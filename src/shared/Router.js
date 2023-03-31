import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE } from "../helpers/pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={< />} /> */}
        <Route path="/extrainfo" element={PAGE.extraInfo.index}>
          <Route path="teacher" element={PAGE.extraInfo.teacher} />
          <Route path="parent" element={PAGE.extraInfo.parent} />
        </Route>
        <Route path="/host" element={PAGE.host} />

        <Route path="/classes" element={PAGE.member} />
        <Route path="/classes/:id" element={PAGE.member} />
        <Route path="/host/:classId" element={PAGE.host} />
        <Route path="/host/:classId/:scheduleId" element={PAGE.host} />
        <Route
          path="/host/:classroomId/:scheduleId?/:timeId?"
          element={PAGE.host}
        />
        <Route path="/preview" element={PAGE.preview} />
        <Route path="/login" element={PAGE.login} />
        <Route path="/oauth/kakao/callback" element={PAGE.kakaoLogin} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
