import React from 'react';
import styled from 'styled-components';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';



Pagination = ({ current, pageSize, total, onChange }) => {
    return (
        <StyledPagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
        />
    );
};

export default Pagination;

const StyledPagination = styled(Pagination)`

  display: flex;
  justify-content: center;
  margin-top: 30px;

  .rc-pagination-item {
    margin-right: 5px;
  }
`;