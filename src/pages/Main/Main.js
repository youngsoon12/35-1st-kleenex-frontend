import React, { useEffect, useState } from 'react';
import Slide from './Slide/Slide';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  IMAGE_DATA,
  BANNER_CARD_DATA,
  BOTTOM_LINK_DATA,
} from '../Main/data/data';
import './main.scss';

function Main() {
  const [imgId, setImgId] = useState(1);
  const [values, setValues] = useState({
    imgURL: '',
    korTitle: '',
    engTitle: '',
    details: '',
    roastedDate: '',
    price: '',
  });
  const [newValue, setNewValue] = useState();

  // mock data 가져오기

  async function request() {
    const res1 = await fetch('/data/productCardBest.json');
    const result1 = await res1.json();
    const res2 = await fetch('/data/productCardNew.json');
    const result2 = await res2.json();
    setValues(result1);
    setNewValue(result2);
  }

  useEffect(() => {
    request();
  }, []);

  // 이미지 슬라이드 기능 구현
  const showPrevImage = () => {
    imgId === 1 ? setImgId(IMAGE_DATA.length) : setImgId(prevId => prevId - 1);
  };

  const showNextImage = () => {
    imgId === IMAGE_DATA.length ? setImgId(1) : setImgId(prevId => prevId + 1);
  };

  useEffect(() => {
    const cycleImage = () => {
      imgId === IMAGE_DATA.length
        ? setImgId(1)
        : setImgId(prevId => prevId + 1);
    };

    const autoSlide = setInterval(cycleImage, 4000);
    return () => {
      clearInterval(autoSlide);
    };
  }, [imgId]);

  if (values.length) {
    return (
      <section className="main" id="home">
        <div className="mainSliderContainer">
          {IMAGE_DATA.map(image => {
            return (
              <Slide
                key={image.id}
                id={image.id}
                url={image.url}
                subTitle={image.subTitle}
                Title1={image.Title1}
                Title2={image.Title2}
                imgId={imgId}
              />
            );
          })}
          <div className="mainSliderRightArrow" onClick={showNextImage}>
            <i className="bx bx-chevron-right" />
          </div>
          <div className="mainSliderLeftArrow" onClick={showPrevImage}>
            <i className="bx bx-chevron-left" />
          </div>
        </div>
        <div className="mainContainer">
          <div className="upperMargin">
            <div className="mainBestList">
              <div className="bestListTitleContainer">
                <div className="bestListTitle">BEST</div>
                <a href="#home" className="bestListLink">
                  + SHOP
                </a>
              </div>
              <ul className="bestListProductRecommend">
                {values.map(product => {
                  return (
                    <ProductCard key={product.id} {...product} cardSize="Big" />
                  );
                })}
              </ul>
            </div>
            <div className="mainNewList">
              <div className="newListTitleContainer">
                <div className="newListTitle">NEW</div>
                <a href="#home" className="newListLink">
                  + SHOP
                </a>
              </div>
              <ul className="newListProductRecommend">
                {newValue.map(product => {
                  return (
                    <ProductCard
                      key={product.id}
                      {...product}
                      cardSize="Small"
                    />
                  );
                })}
              </ul>
            </div>
            <div className="mainBannerContainer">
              <img src="./images/colombia.jpg" alt="coffee" />
              <ul className="mainBannerSection">
                {BANNER_CARD_DATA.map(data => {
                  return (
                    <li className="mainBannerCard" key={data.id}>
                      <div className="cardTitle">{data.Title}</div>
                      <div className="cardSubTitle">{data.subTitle}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mainBottomLink">
              <ul className="mainBottomContainer">
                {BOTTOM_LINK_DATA.map(img => {
                  return (
                    <li key={img.id}>
                      <a href="#home">
                        <img src={img.url} alt="icon1" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="loadingContainer">
        <div className="loadingIcon">
          <i class="bx bxs-coffee bx-tada" />
          <span className="loadingText">커피를 가져오는 중이에요...</span>
        </div>
      </div>
    );
  }
}

export default Main;
