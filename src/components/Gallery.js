import React, { useState } from "react";
import "../css/Gallery.css";
import { ImagePopup } from "./ImagePopup";

const Gallery = ({ allImages }) => {
  const [imgSrc, setImgSrc] = useState();
  const [pop, setPop] = useState(false);

  const popup = (e) => {
    setPop(!pop);
    setImgSrc(e.target.src);
  };

  return (
    <div className="gallery">
      {allImages.length !== 0 &&
        allImages.map((item, index) => (
          <img src={item.urls.regular} alt="" key={index} onClick={popup} />
        ))}

      {pop && (
        <ImagePopup
          pop={pop}
          setPop={setPop}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          allImages={allImages}
        />
      )}
    </div>
  );
};

export default Gallery;

/**
 *       <img src="/images/pexels-mikotoraw-photographer-3639496.jpg" alt="" />
      <img
        src="/images/man-wearing-white-turtle-neck-t-shirt-1036645.jpg"
        alt=""
      />
      <img src="/images/pexels-mikotoraw-photographer-3639496.jpg" alt="" />
      <img
        src="/images/man-wearing-brown-suit-jacket-mocking-on-white-telephone-1587014.jpg"
        alt=""
      />
      <img
        src="/images/man-wearing-brown-suit-jacket-mocking-on-white-telephone-1587014.jpg"
        alt=""
      />
      <img
        src="/images/man-wearing-white-turtle-neck-t-shirt-1036645.jpg"
        alt=""
      />
      <img src="/images/pexels-wallace-chuck-3156475.jpg" alt="" />
      <img src="/images/pexels-wallace-chuck-3156475.jpg" alt="" />
      <img src="/images/pexels-andrea-piacquadio-3765147.jpg" alt="" />
      <img src="/images/pexels-bryan-catota-3756766.jpg" alt="" />
      <img src="/images/pexels-bryan-catota-3756766.jpg" alt="" />
 */
