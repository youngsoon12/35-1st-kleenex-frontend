import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavSmall from './NavSmall';
import './Nav.scss';

// true false
const Nav = () => {
  const [isShowNavbar, setIsShowNavbar] = useState(true);
  const [isSearchOn, setIsSearchOn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 0 ? setIsShowNavbar(false) : setIsShowNavbar(true);
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  const handleSearchOpen = () => {
    setIsSearchOn(isSearchOn => !isSearchOn);
  };

  if (isShowNavbar) {
    return (
      <div className="Navv">
        <div className="header">
          <div className="inner">
            <div className="link">
              <Link to="/">
                <img src="./images/Nav/NavLogo.jpg" alt="테라로사" />
              </Link>
            </div>
            <div className="categoryMid">
              {isSearchOn ? (
                <div>
                  <input placeholder="입력해주세요." className="searchBar" />

                  <img
                    src="./images/Nav/search.png"
                    alt="돋보기"
                    className="searchIcon"
                    onClick={handleSearchOpen}
                  />
                </div>
              ) : (
                <ul>
                  {LINK_DATA.map((data, index) => {
                    return (
                      <span key={index}>
                        <Link to="/" className="link">
                          <li className={data.className}>{data.name}</li>
                        </Link>
                      </span>
                    );
                  })}
                  <li className="search" onClick={handleSearchOpen}>
                    SEARCH
                  </li>
                </ul>
              )}
            </div>
            <div className="categoryRight">
              <ul className="rightTop">
                {RIGHT_TOP_DATA.map(data => {
                  return (
                    <span key={data.id}>
                      <Link to="/">
                        <li>{data.name}</li>
                      </Link>
                      <li>&nbsp;|&nbsp; </li>
                    </span>
                  );
                })}
              </ul>
              <ul className="link">
                {LAST_LINK_DATA.map((data, index) => {
                  return (
                    <span key={index}>
                      <Link to="/">
                        <li className={data.className}>{data.name}</li>
                      </Link>
                    </span>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NavSmall />;
  }
};

export default Nav;

const LINK_DATA = [
  { className: 'about', name: 'ABOUT' },
  { className: 'shop', name: 'SHOP' },
];

const RIGHT_TOP_DATA = [
  { id: 1, name: '로그인' },
  { id: 2, name: '주문/배송' },
  { id: 3, name: '장바구니' },
  { id: 4, name: '문의' },
];
const LAST_LINK_DATA = [
  { name: 'MUSEUM', className: 'museum' },
  { name: 'TERA TIMES', className: 'teraTimes' },
  { name: 'LOCATIONS', className: 'locations' },
];
