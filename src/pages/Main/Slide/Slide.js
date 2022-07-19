import React from 'react';
import './slide.scss';

function Slide({ id, url, subTitle, Title1, Title2, imgId }) {
  return (
    <div className="slide">
      <div className={`mainSliderImage ${imgId === id ? 'active' : ''}`}>
        <img src={url} alt="slide1" className="image" />
        <div className="mainSliderText">
          <span className="sliderSubTitle">{subTitle}</span>
          <span className="sliderTitle">
            {Title1} <br />
            {Title2}
          </span>
          <div className="shopNowButton">SHOP NOW</div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
