import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "../utils/debounce";
import { useEffect } from "react";

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

  const handleSearch = useCallback(
    debounce((searchText) => {
      setSearchText(searchText);
    }, 500),
    []
  );

  useEffect(() => {
    console.log(data?.data?.data);
    console.log(isLoading);
  }, [data, isLoading]);

  return { data, isLoading, isError, handleSearch };
};

export default useSearch;
