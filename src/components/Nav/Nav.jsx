import React, { useEffect, useState } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import './NavSmall';
import NavSmall from './NavSmall';

// true false
const Navv = () => {
  const [show, setShow] = useState(true);
  const [middleOn, setMiddleOn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 1 ? setShow(false) : setShow(true);
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  const handleSearchOpen = () => {
    middleOn ? setMiddleOn(false) : setMiddleOn(true);
  };

  if (show) {
    return (
      <div className="Navv">
        <div className="header">
          <div className="inner">
            <div className="first">
              <h1>
                <Link to>
                  <img src="./images/Nav/NavLogo.jpg" alt="테라로사" />
                </Link>
              </h1>
            </div>
            <div className="middle">
              {middleOn && (
                <div>
                  <input placeholder="입력해주세요." className="searchBar" />

                  <img
                    src="./images/Nav/search.png"
                    alt="돋보기"
                    className="searchIcon"
                    onClick={handleSearchOpen}
                  />
                </div>
              )}
              {middleOn || (
                <ul>
                  <Link to="/" className="link">
                    <li className="about">ABOUT</li>
                  </Link>
                  <Link to="/" className="link">
                    <li className="shop">SHOP</li>
                  </Link>
                  <Link to="/" className="link">
                    <li className="search" onClick={handleSearchOpen}>
                      SEARCH
                    </li>
                  </Link>
                </ul>
              )}
            </div>
            <div className="last">
              <ul className="rightTop">
                <Link to="/">
                  <li>로그인</li>
                </Link>
                <li>&nbsp;|&nbsp; </li>
                <Link to="/">
                  <li>주문/배송</li>
                </Link>
                <Link to="/">
                  <li>&nbsp;|&nbsp; </li>
                </Link>
                <Link to="/">
                  <li>장바구니</li>
                </Link>
                <li>&nbsp;|&nbsp;</li>
                <Link to="/">
                  <li>문의</li>
                </Link>
              </ul>
              <ul className="link">
                <Link to="/">
                  <li className="museum">MUSEUM</li>
                </Link>
                <Link to="/">
                  <li className="teraTimes">TERA TIMES</li>
                </Link>
                <Link to="/">
                  <li className="locations">LOCATIONS</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="box" />
      </div>
    );
  } else {
    return <NavSmall />;
  }
};

export default Navv;
