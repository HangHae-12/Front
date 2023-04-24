import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE } from "../helpers/pages";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./ScrollToTop";
import LoadingModal from "./components/Modals/LoadingModal";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingModal />}>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/main" element={PAGE.main} />
          {/* 로그인 페이지는 private route 를 적용하지  */}
          <Route path="/login" element={PAGE.login} />
          <Route path="/oauth/kakao/callback" element={PAGE.kakaoLogin} />
          <Route path="/oauth/kakao/callback" element={PAGE.kakaoUnlinked} />
          {/* 카카오로그인후 추가정보 페이지 */}
          <Route element={<PrivateRoute />}>
            <Route path="/signup" element={PAGE.signup.layout}>
              <Route index element={PAGE.signup.signup} />
              <Route path="search" element={PAGE.signup.search} />
              <Route path="teacher" element={PAGE.signup.teacher} />
              <Route path="principal" element={PAGE.signup.principal} />
              <Route path="parent" element={PAGE.signup.parent} />
              <Route path="success" element={PAGE.signup.success} />
              <Route path="registration" element={PAGE.signup.registration}>
                <Route path="info" element={PAGE.signup.info} />
                <Route path="class" element={PAGE.signup.class} />
              </Route>
            </Route>
            <Route path="/" element={PAGE.layout}>
              <Route index element={PAGE.member} />
              <Route path="/classes" element={PAGE.member} />
              <Route path="/classes/:id" element={PAGE.member} />
              {/* 관리페이지 */}
              <Route path="/host" element={PAGE.host} />
              <Route
                path="/host/:classroomId/:scheduleId?/:timeId?"
                element={PAGE.host}
              />
              {/* 출석부페이지 */}
              <Route path="/dayAttendance" element={PAGE.dayAttendance} />
              <Route path="/dayAttendance/:id" element={PAGE.dayAttendance} />
              <Route path="/monthAttendance" element={PAGE.monthAttendance} />
              <Route
                path="/monthAttendance/:id"
                element={PAGE.monthAttendance}
              />
              {/* 멤버관리페이지 */}
              <Route path="/memberManage/" element={PAGE.memberManage} />
              <Route path="/memberManage/:id" element={PAGE.memberManage} />
              {/* 아이관리페이지 */}
              <Route path="/childmanage" element={PAGE.childmanage} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
