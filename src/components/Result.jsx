import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loading from "./Loading";
import { useResultContext } from "../context/ResultContextProvider";
const Result = () => {
  const { getResult, results, loading, search } = useResultContext();
  const location = useLocation();
  useEffect(() => {
    if (search) {
      if (location.pathname === "/videos") {
        getResult(`/search/q=${search} videos`);
      } else {
        getResult(`${location.pathname}/q=${search}&num=40`);
      }
    }
  }, [search, location.pathname]);
  if (loading) {
    return <Loading />;
  }
  // console.log(location.pathname)
  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.subString(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className="sm:p-3 p-5 "
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items.center">
          {results?.map(({ links, id, source, title }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer">
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results?.results?.map((video, index) => (
            <div key={index} className="p-2">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return "Error";
  }
};

export default Result;
