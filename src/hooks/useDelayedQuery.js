import { useState, useEffect } from "react";

const useDelayedQuery = (delay = 100) => {
  const [queryEnabled, setQueryEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryEnabled(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return queryEnabled;
};

export default useDelayedQuery;
