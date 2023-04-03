import React from "react";
import styled from "styled-components";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

const CustomPagination = ({ current, pageSize, total, onChange }) => {
  return (
    <StyledPagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
    />
  );
};

export default CustomPagination;

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 30px;


/* .rc-pagination-jump-next button:after, 
.rc-pagination-jump-prev button:after {
    display: block;
    content: "•••";
} */
.rc-pagination-item, 
.rc-pagination-prev, 
.rc-pagination-next, 
.rc-pagination-total-text {
    min-width: initial;
    height: auto;
    line-height: initial;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.rc-pagination-item a, 
.rc-pagination-item button, 
.rc-pagination-prev a, 
.rc-pagination-prev button, 
.rc-pagination-next a, 
.rc-pagination-next button,
.rc-pagination-total-text a, 
.rc-pagination-total-text button {
    padding: 6px 8px;
    height: auto;
    min-width: 32px;
    min-height: 32px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.grayScale[400]} !important;
    transition: 0.3s;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
}
.rc-pagination-item.rc-pagination-item-active a, 
.rc-pagination-item.rc-pagination-item-active a:hover, 
.rc-pagination-prev.rc-pagination-item-active a, 
.rc-pagination-prev.rc-pagination-item-active a:hover, 
.rc-pagination-next.rc-pagination-item-active a, 
.rc-pagination-next.rc-pagination-item-active a:hover, 
.rc-pagination-total-text.rc-pagination-item-active a, 
.rc-pagination-total-text.rc-pagination-item-active a:hover {
    background-color: ${({ theme }) => theme.color.primary};
    border-color: ${({ theme }) => theme.color.primary};
    color: #ffffff !important;
}
.rc-pagination-item a:hover, 
.rc-pagination-item button:hover, 
.rc-pagination-prev a:hover, 
.rc-pagination-prev button:hover, 
.rc-pagination-next a:hover, 
.rc-pagination-next button:hover, 
.rc-pagination-total-text a:hover, 
.rc-pagination-total-text button:hover {
    background-color: #eceff5;
    border-color: #eceff5;
}

`