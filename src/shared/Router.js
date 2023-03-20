import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Host from '../pages/Host/Host';
import Preview from "../pages/Preview";
import Classes from "../pages/Classes/Classes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Host />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/common/classes" element={<Classes />} />
        <Route path="/common/classes/:id" element={<Classes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
