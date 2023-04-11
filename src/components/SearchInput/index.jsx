import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.grayScale[100]};
  border-radius: 4px;
  padding: 3px 8px;
  background: ${({ theme }) => theme.color.white};

  &:hover {
    border-color: ${({ theme }) => theme.color.grayScale[200]};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.color.green_darker};
    box-shadow: 0 0 0 5px ${({ theme }) => theme.color.green_darker};
  }
`;

const SearchIcon = styled(GoSearch)`
  font-size: 18px;
  color: ${({ theme }) => theme.color.grayScale[500]};
  margin-right: 8px;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: inherit;

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

const SearchInput = ({ onSearch }) => {
  // const [searchText, setSearchText] = useState("");
  // const searchInputRef = useRef();

  // useEffect(() => {
  //   const handleSearch = async () => {
  //     await onSearch(searchText);
  //   };

  //   const timer = setTimeout(() => {
  //     if (searchInputRef.current.value === searchText) {
  //       handleSearch();
  //     }
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchText, onSearch]);

  return (
    <SearchWrapper>
      <SearchIcon />
      <Input
        // ref={searchInputRef}
        // type="search"
        // value={searchText}
        // onChange={(e) => setSearchText(e.target.value)}
        // placeholder="검색어를 입력하세요"
        type="search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
