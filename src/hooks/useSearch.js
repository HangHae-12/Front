import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "../utils/debounce";

const useSearch = (api) => {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["search", searchText],
    () => api(searchText),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const handleSearch = useCallback(
    debounce((searchText) => {
      setSearchText(searchText);
    }, 500),
    []
  );

  return { data, isLoading, isError, handleSearch };
};

export default useSearch;
