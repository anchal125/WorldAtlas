import { useEffect, useState, useTransition, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const useCountries = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [apiData, setApiData] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const filteredCountries = useMemo(() => {
    return apiData.filter((item) => {
      const matchesSearch = item.name.common
        .toLowerCase()
        .includes(debouncedSearch);

      const matchesFilter = filter === "All" || item.region === filter;

      return matchesSearch && matchesFilter;
    });
  }, [debouncedSearch, apiData, filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetch(
          "https://restcountries.com/v5.1/all?fields=name,population,region,capital,flags",
        );
        if (!data.ok) {
          throw new Error(`HTTP error! Status: ${data.status}`);
        }
        const response = await data.json();
        setApiData(response);
      } catch (error) {
        console.log(error.message);
        navigate("/error");
      }
    });
  }, []);

  return {
    isPending,
    filteredCountries,
    search,
    setSearch,
    apiData,
    setFilter,
  };
};
