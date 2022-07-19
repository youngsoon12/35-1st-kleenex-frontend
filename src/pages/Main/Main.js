import React, { useEffect, useState, useRef } from 'react';
import './main.scss';

function Main() {
  const [img, setImg] = useState({
    img1: 'active',
    img2: '',
    img3: '',
    img4: '',
  });
  const interval = useRef();

  useEffect(() => {
    const cycleImage = () => {
      if (img.img1 === 'active') {
        setImg({ ...img, img1: '', img2: 'active' });
      } else if (img.img2 === 'active') {
        setImg({ ...img, img2: '', img3: 'active' });
      } else if (img.img3 === 'active') {
        setImg({ ...img, img3: '', img4: 'active' });
      } else if (img.img4 === 'active') {
        setImg({ ...img, img4: '', img1: 'active' });
      }
    };

    interval.current = setInterval(cycleImage, 4000);
    return () => {
      clearInterval(interval.current);
    };
  }, [img]);

  const onleftClick = () => {
    clearInterval(interval.current);
    if (img.img1 === 'active') {
      setImg({ ...img, img1: '', img4: 'active' });
    } else if (img.img4 === 'active') {
      setImg({ ...img, img4: '', img3: 'active' });
    } else if (img.img3 === 'active') {
      setImg({ ...img, img3: '', img2: 'active' });
    } else if (img.img2 === 'active') {
      setImg({ ...img, img2: '', img1: 'active' });
    }
  };

  const onrightClick = () => {
    clearInterval(interval.current);
    if (img.img1 === 'active') {
      setImg({ ...img, img1: '', img2: 'active' });
    } else if (img.img2 === 'active') {
      setImg({ ...img, img2: '', img3: 'active' });
    } else if (img.img3 === 'active') {
      setImg({ ...img, img3: '', img4: 'active' });
    } else if (img.img4 === 'active') {
      setImg({ ...img, img4: '', img1: 'active' });
    }
  };

  return (
    <section className="main" id="home">
      <div className="mainSliderContainer">
        <div className={`mainSliderImage ${img.img1}`}>
          <img
            src="../images/silde/ethiopia1.jpg"
            alt="slide1"
            className="image"
          />
          <div className="mainSliderText">
            <span className="sliderSubTitle">에티오피아 예가체페 첼베사</span>
            <span className="sliderTitle">
              Ethiopia <br />
              Yirgacheffe Chelbesa
            </span>
            <div className="shopNowButton">SHOP NOW</div>
          </div>
        </div>
        <div className={`mainSliderImage ${img.img2}`}>
          <img
            src="../images/silde/indonesia.jpg"
            alt="slide2"
            className="image"
          />
          <div className="mainSliderText">
            <span className="sliderSubTitle">
              인도네시아 COE 3위 판탄 무사라
            </span>
            <span className="sliderTitle">
              2021 Indonesia <br />
              C.O.E Winner
            </span>
            <div className="shopNowButton">SHOP NOW</div>
          </div>
        </div>
        <div className={`mainSliderImage ${img.img3}`}>
          <img
            src="../images/silde/colombia1.jpg"
            alt="slide3"
            className="image"
          />
          <div className="mainSliderText">
            <span className="sliderSubTitle">콜롬비아 호세 플로레즈</span>
            <span className="sliderTitle">
              Colombia <br />
              Jose Florez
            </span>
            <div className="shopNowButton">SHOP NOW</div>
          </div>
        </div>
        <div className={`mainSliderImage ${img.img4}`}>
          <img
            src="../images/silde/ethiopia2.jpg"
            alt="slide4"
            className="image"
          />
          <div className="mainSliderText">
            <span className="sliderSubTitle">에티오피아 구지 함벨라</span>
            <span className="sliderTitle">
              Ethiopia <br />
              Guji Hambela
            </span>
            <div className="shopNowButton">SHOP NOW</div>
          </div>
        </div>
        <div className="mainSliderRightArrow" onClick={onrightClick}>
          <i className="bx bx-chevron-right" />
        </div>
        <div className="mainSliderLeftArrow" onClick={onleftClick}>
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
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
            </ul>
          </div>
          <div className="mainBestList">
            <div className="bestListTitleContainer">
              <div className="bestListTitle">NEW</div>
              <a href="#home" className="bestListLink">
                + SHOP
              </a>
            </div>
            <ul className="bestListProductRecommend">
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
              <li className="bestListProduct">
                <div>컴포넌트</div>
              </li>
            </ul>
          </div>
          <div className="mainBannerContainer">
            <img src="./images/coffee1.jpg" alt="coffee" />
            <ul className="mainBannerSection">
              <li className="mainBannerCard">
                <div className="cardTitle">DRIP BAG</div>
                <div className="cardSubTitle">드립백</div>
              </li>
              <li className="mainBannerCard">
                <div className="cardTitle">DELI</div>
                <div className="cardSubTitle">식품</div>
              </li>
              <li className="mainBannerCard">
                <div className="cardTitle">GREEN BEAN</div>
                <div className="cardSubTitle">생두</div>
              </li>
              <li className="mainBannerCard">
                <div className="cardTitle">SUBSCRIPTION</div>
                <div className="cardSubTitle">정기배송</div>
              </li>
            </ul>
          </div>
          <div className="mainBottomLink">
            <ul className="mainBottomContainer">
              <li>
                <a href="#home">
                  <img
                    src="https://terarosa.com/SkinImg/main_bt_01.jpg"
                    alt="icon1"
                  />
                </a>
              </li>
              <li>
                <a href="#home">
                  <img
                    src="https://terarosa.com/SkinImg/main_bt_02.jpg"
                    alt="icon2"
                  />
                </a>
              </li>
              <li>
                <a href="#home">
                  <img
                    src="https://terarosa.com/SkinImg/main_bt_03.jpg"
                    alt="icon3"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
