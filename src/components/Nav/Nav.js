import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavSmall from './NavSmall';
import SearchCard from './search/SearchCard';
import './Nav.scss';

// true false
const Nav = () => {
  const [isShowNavbar, setIsShowNavbar] = useState(true);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([]);
  // const [postData, setPostData] = useState('');

  // mokData
  // async function request() {
  //   const res = await fetch('/data/productCardBest.json');
  //   const result = await res.json();
  //   setValues(result);
  // }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 0 ? setIsShowNavbar(false) : setIsShowNavbar(true);
    });
    // request(); //mokData
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const handleSearchOpen = () => {
    setSearch('');
    setIsSearchOn(isSearchOn => !isSearchOn);
  };

  const inputSearch = e => {
    setSearch(e.target.value);

    if (search) {
      fetch(`http://10.58.3.145:8000/products/main/test?search=${search}`)
        .then(res => res.json())
        .then(result => {
          setValues(result);
        });
    }
    console.log(values);
  };

  const filterValue = values.filter(data => {
    if (!search.startsWith(' ')) {
      return data.korTitle.includes(search);
    }
  });

  if (isShowNavbar) {
    return (
      <div className="Nav">
        <div className="header">
          {search && isSearchOn && (
            <div className="searchBox">
              <div className="searchBoxContainer">
                <div className="leftContainer">
                  <div className="linkBox">
                    <ul>
                      <li>싱글블렌드</li>
                      <li>로스팅</li>
                      <li>원두</li>
                    </ul>
                  </div>
                </div>
                <div className="rightContainer">
                  {' '}
                  {filterValue.map((data, index) => {
                    return (
                      <SearchCard key={data.id} {...data} cardSize="Small" />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div className="inner">
            <div className="link">
              <Link to="/main">
                <img
                  src="/images/Nav/Navlogo.jpg"
                  alt="테라로사"
                  className="logoImg"
                />
              </Link>
            </div>
            <div className="categoryMid">
              {isSearchOn ? (
                <div>
                  <div className="inputRelative">
                    <input
                      placeholder="검색"
                      className="searchBar"
                      onChange={inputSearch}
                      // onBlur={handleSearchOpen}
                      autoFocus
                    />
                    {/* <img
                      src="/images/Nav/search.png"
                      alt="돋보기"
                      className="searchIcon"
                      onClick={handleSearchOpen}
                    /> */}
                  </div>
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
                      <Link to={`${data.link}`}>
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
  { id: 1, name: '로그인', link: '/login' },
  { id: 2, name: '주문/배송', link: '/' },
  { id: 3, name: '장바구니', link: '/' },
  { id: 4, name: '문의', link: '/' },
];
const LAST_LINK_DATA = [
  { name: 'MUSEUM', className: 'museum' },
  { name: 'TERA TIMES', className: 'teraTimes' },
  { name: 'LOCATIONS', className: 'locations' },
];
