import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import "../css/Home.css";
import Gallery from "../components/Gallery";
import { getImages } from "../api/unsplashApi";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    getImages()
      .then((res) => {
        console.log(res);
        setAllImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Array.from(document.querySelectorAll("img")).map((img) =>
      setAllImages((prop) => [...prop, img.src])
    );
  }, []);

  const searchSubmit = (e) => {
    if (!searchValue) e.preventDefault();
  };

  const trendSubmit = (e) => {
    let content = e.target.textContent.split(",")[0];

    setSearchValue(content);

    const btn = document.querySelector("form");
    const input = document.querySelector("input");
    input.value = content;
    btn.submit();
  };

  return (
    <div className="home">
      <section>
        <div className="container">
          <h1>FreeFrames</h1>
          <p>
            The internet's source of <span>freely-usable images.</span>
            <br />
            Powered by creators everywhere.
          </p>
          <form
            action="/search"
            onSubmit={searchSubmit}
            className="search-container"
          >
            <button>
              <BiSearch className="icon" />
            </button>
            <input
              type="search"
              name="search"
              id=""
              placeholder="Search photos"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </form>
          <p className="trend">
            Trending: <span onClick={trendSubmit}>flower, </span>
            <span onClick={trendSubmit}>wallpapers, </span>
            <span onClick={trendSubmit}>backgrounds, </span>
            <span onClick={trendSubmit}>happy, </span>
            <span onClick={trendSubmit}>love</span>
          </p>
        </div>
        {/* <div className="footer"></div> */}
      </section>
      <Gallery allImages={allImages} />
    </div>
  );
};

export default Home;
