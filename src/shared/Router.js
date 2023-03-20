import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE } from "../helpers/pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={< />} /> */}
        <Route path="/preview" element={PAGE.Preview} />
        <Route path="/login" element={PAGE.Login} />
        <Route path="/api/user/kakao/callback" element={PAGE.KakaoLogin} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
