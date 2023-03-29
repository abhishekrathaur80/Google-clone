import React, { createContext, useState, useContext } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-web-search1.p.rapidapi.com/api/v1";

export const ResultContextProvider = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("Elon Musk");
  const getResult = async (type) => {
    setLoading(true);
    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_API_KEY,
        "X-RapidAPI-Host": "google-web-search1.p.rapidapi.com",
      },
    });
    const data = await response.json();
    if (type.includes("/news")) {
      setResults(data.entries);
    } else if (type.includes("/images")) {
      setResults(data.image_results);
    } else {
      setResults(data.results);
    }

    setLoading(false);
  };
  return (
    <ResultContext.Provider
      value={{ getResult, results, search, setSearch, loading }}
    >
      {props.children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
