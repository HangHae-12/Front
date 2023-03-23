import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PAGE } from "../helpers/pages";
import Host from "../pages/Host/Host";
import Preview from "../pages/Preview";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={< />} /> */}
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
