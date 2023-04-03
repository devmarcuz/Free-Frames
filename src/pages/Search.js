import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { SiUnsplash } from "react-icons/si";
import "../css/Search.css";
import Gallery from "../components/Gallery";
import { Link, useLocation } from "react-router-dom";
import { searchImages } from "../api/unsplashApi";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [allImages, setAllImages] = useState([]);

  const params = useLocation();
  const searchWord = params.search.split("=").pop();

  useEffect(() => {
    if (searchWord) {
      searchImages(searchWord)
        .then((res) => {
          console.log(res);
          setAllImages(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    Array.from(document.querySelectorAll("img")).map((img) =>
      setAllImages((prop) => [...prop, img.src])
    );
  }, [searchWord]);

  const searchSubmit = (e) => {
    if (!searchValue) e.preventDefault();
  };

  return (
    <div className="search-container">
      <nav>
        <Link to="/" className="logo">
          <SiUnsplash className="icon" />
        </Link>
        <form
          action="/search"
          onSubmit={searchSubmit}
          className="form-container"
        >
          <input
            type="search"
            name="search"
            id=""
            placeholder="Search photos"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button>
            <BiSearch className="icon" />
          </button>
        </form>
      </nav>
      {/* <div className="footer"></div> */}
      <Gallery allImages={allImages} />
    </div>
  );
};

export default Search;
