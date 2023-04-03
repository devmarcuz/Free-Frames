import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../css/ImagePop.css";

export const ImagePopup = ({ setPop, pop, imgSrc, setImgSrc, allImages }) => {
  const [currentImgNo, setCurrentImgNo] = useState();

  useEffect(() => {
    if (!currentImgNo) {
      setCurrentImgNo(allImages.indexOf(imgSrc));
    } else if (currentImgNo === 0) {
      setCurrentImgNo(0);
    } else if (currentImgNo > allImages.length - 1) {
      setCurrentImgNo(allImages.length - 1);
    }
  }, [allImages, imgSrc, currentImgNo]);

  const unPop = () => setPop(false);

  const container = (e) => {
    if (e.target.classList.contains("image-popup")) {
      setPop(false);
    }
  };

  const preBtn = () => {
    if (currentImgNo >= 0 && currentImgNo <= allImages.length - 1) {
      setCurrentImgNo((props) => --props);
      setImgSrc(allImages[currentImgNo]);
    }
  };

  const nxtBtn = () => {
    if (currentImgNo <= allImages.length - 1) {
      setCurrentImgNo((props) => ++props);
      setImgSrc(allImages[currentImgNo]);
    }
  };

  const handleClick = (url) => {
    let filename = url.split("/").pop().split(".")[0];
    let mime = url.split("/").pop().split(".").pop();

    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        const urlLink = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = urlLink;
        link.setAttribute("download", `${filename}.${mime}`);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
      });
  };

  return (
    <div
      className={pop ? "image-popup active" : "image-popup"}
      onClick={container}
    >
      <div className="container">
        <div className="header">
          <div className="shape" onClick={unPop}></div>
          <button className="btn" onClick={() => handleClick(imgSrc)}>
            Download Image
          </button>
        </div>
        <img src={imgSrc} alt="" className={pop ? "motion" : ""} />
        <div className="controls">
          <FaChevronLeft className="icon-left" onClick={preBtn} />
          <FaChevronRight className="icon-right" onClick={nxtBtn} />
        </div>
      </div>
    </div>
  );
};
