import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavSmall.scss';

const NavSmall = () => {
  const [isSearchOn, setIsSearchOn] = useState(false);

  const handleSearchOpen = () => {
    setIsSearchOn(isSearchOn => !isSearchOn);
  };

  return (
    <div className="NavSmall">
      <div className="inner">
        <div className="first">
          <Link to="/">
            <img src="/images/Nav/NavSmallLogo.png" alt="로고" />
          </Link>
        </div>
        <div className="categoryOne">
          {isSearchOn && (
            <div className="searchTag">
              <input placeholder="입력해주세요." className="searchBar" />
              <img
                src="/images/Nav/search.png"
                alt="돋보기"
                className="searchIcon"
                onClick={handleSearchOpen}
              />
            </div>
          )}
          {isSearchOn || (
            <ul>
              {CATEGORY_ONE.map((data, index) => {
                return (
                  <Link to="/" key={index}>
                    <li className={data.className}>{data.value}</li>
                  </Link>
                );
              })}
              <li className="search" onClick={handleSearchOpen}>
                SEARCH
              </li>
            </ul>
          )}
        </div>
        <div className="categoryTwo">
          <ul>
            {CATEGORY_TWO.map((data, index) => {
              return (
                <Link to="/" key={index}>
                  <li className={data.className}>{data.value}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="iconBar">
          <ul>
            {iconBarImage.map((no, index) => {
              return (
                <Link to="/" key={index}>
                  <li>
                    <img src={`/images/Nav/icon${no}.png`} alt="로그인" />
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavSmall;

const CATEGORY_ONE = [
  { className: 'about', value: 'ABOUT' },
  { className: 'shop', value: 'SHOP' },
];

const CATEGORY_TWO = [
  { className: 'museum', value: 'MUSEUM' },
  { className: 'teraTimes', value: 'TERA TIMES' },
  { className: 'loacations', value: 'LOCATIONS' },
];

const iconBarImage = [1, 2, 3, 4];
