import React, { useEffect, useState } from 'react';
import Slide from './Slide/Slide';
import ProductCard from '../../components/ProductCard/ProductCard';
import {
  IMAGE_DATA,
  BANNER_CARD_DATA,
  BOTTOM_LINK_DATA,
} from '../Main/data/data';
import { CONFIG_URL } from '../../config';
import './main.scss';

function Main() {
  const [imgId, setImgId] = useState(1);
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState([]);

  // mock data 가져오기

  async function request() {
    const res = await fetch(`${CONFIG_URL}/products/main`);
    const result = await res.json();
    setValues(result.premium);
  }

  async function newRequest() {
    const res = await fetch(`${CONFIG_URL}/products/main`);
    const result = await res.json();
    setNewValue(result.fresh_product);
  }

  useEffect(() => {
    request();
    newRequest();
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
            return <Slide key={image.id} {...image} imgId={imgId} />;
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
                {values.map((product, i) => {
                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      img={product.img[0].img_url}
                      name={product.name}
                      eng_name={product.eng_name}
                      taste={product.taste.map(taste => taste.taste_name)}
                      roasting_date={product.roasting_date}
                      price={product.price}
                      cardSize="Big"
                    />
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
                      id={product.id}
                      img={product.img[0].img_url}
                      name={product.name}
                      eng_name={product.eng_name}
                      taste={product.taste.map(taste => taste.taste_name)}
                      roasting_date={product.roasting_date}
                      price={product.price}
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
