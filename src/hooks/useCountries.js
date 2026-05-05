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
      if (debouncedSearch) {
        if (filter === "All")
          return item.name.common
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());
        else
          return (
            item.name.common
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) &&
            item.region === filter
          );
      } else {
        if (filter === "All") return apiData;
        else return item.region === filter;
      }
    });
  }, [debouncedSearch, apiData, filter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
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