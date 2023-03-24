import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PAGE } from "../helpers/pages";
import Host from "../pages/Host/Host";
import Preview from "../pages/Preview";
import Classes from "../pages/Classes/Classes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={< />} /> */}
        <Route path="/host" element={PAGE.host} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/common/classes" element={<Classes />} />
        <Route path="/common/classes/:id" element={<Classes />} />
        <Route path="/preview" element={PAGE.preview} />
        <Route path="/login" element={PAGE.login} />
        <Route path="/api/user/kakao/callback" element={PAGE.kakaoLogin} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
