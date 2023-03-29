import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Links from "./Links";
import { useResultContext } from "../context/ResultContextProvider";

const Search = () => {
  const [text, setText] = useState("Elon Musk");
  const { setSearch } = useResultContext();
  const [debounceValue] = useDebounce(text, 300);
  useEffect(() => {
    if (debounceValue) setSearch(debounceValue);
  }, [debounceValue]);
  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="🔎 Search Google or type URL"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
      />
      {text !== "" && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500"
          onClick={() => setText("")}
        >
          x
        </button>
      )}
      <Links />
    </div>
  );
};

export default Search;
