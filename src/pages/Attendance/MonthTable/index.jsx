import React, { useEffect } from "react";
import Table from "./Table";

const MonthTable = () => {

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return <Table />;
};

export default MonthTable;
