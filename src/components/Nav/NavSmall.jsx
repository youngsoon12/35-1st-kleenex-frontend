import React, { useState } from 'react';
import './NavSmall.scss';
import { Link } from 'react-router-dom';

const NavSmall = () => {
  const [show, setShow] = useState(false);

  const handleSearchOpen = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <div className="NavSmall">
      <div className="inner">
        <div className="first">
          <Link to="/">
            <img src="./images/Nav/NavSmallLogo.png" alt="로고" />
          </Link>
        </div>
        <div className="categoryOne">
          {show && (
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
          {show || (
            <ul>
              <Link to="/">
                <li className="about">ABOUT</li>
              </Link>
              <Link to="/">
                <li className="shop">SHOP</li>
              </Link>
              <Link to="/">
                <li className="search" onClick={handleSearchOpen}>
                  SEARCH
                </li>
              </Link>
            </ul>
          )}
        </div>
        <div className="categoryTwo">
          <ul>
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
        <div className="iconBar">
          <ul>
            <Link to="/">
              <li>
                <img src="./images/Nav/icon1.png" alt="로그인" />
              </li>
            </Link>
            <Link to="/">
              <li>
                <img src="./images/Nav/icon2.png" alt="주문내역" />
              </li>
            </Link>
            <Link to="/">
              <li>
                <img src="./images/Nav/icon3.png" alt="주문내역" />
              </li>
            </Link>
            <Link to="/">
              <li>
                <img src="./images/Nav/icon4.png" alt="주문내역" />
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavSmall;
