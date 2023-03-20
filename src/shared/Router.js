import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Host from '../pages/Host/Host';
import Preview from "../pages/Preview";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Host />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
