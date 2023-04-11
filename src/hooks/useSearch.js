// useSearch.js
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const useSearch = (api) => {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["search", searchText],
    () => api(searchText),
    {
      enabled: searchText.length > 0,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  return { data, isLoading, isError, handleSearch };
};

export default useSearch;
