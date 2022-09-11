import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavSmall from './NavSmall';
import SearchCard from './search/SearchCard';
import { CONFIG_URL } from '../../config';
import './Nav.scss';
import { useDebounce } from '../../hooks/useDebounce';

// true false
const Nav = () => {
  const [isShowNavbar, setIsShowNavbar] = useState(true);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([]);
  const [isToken, setIsToken] = useState(false);
  const filterValue = useRef([]);
  const location = useLocation();

  const deBounceSearch = useDebounce(search, 1000);
  // json
  async function request() {
    if (deBounceSearch.length === 0) {
      setValues([]);
      return;
    }
    const res = await fetch(
      `${CONFIG_URL}/products/main/search?keywords=${deBounceSearch}`
    );
    const result = await res.json();
    console.log('보내는중', deBounceSearch);
    setValues(result.result);
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 0 ? setIsShowNavbar(false) : setIsShowNavbar(true);
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, [location]);

  const logOut = () => {
    localStorage.removeItem('Token');
    return setIsToken(isToken => !isToken);
  };

  useEffect(() => {
    request();
  }, [deBounceSearch]);

  const handleSearchOpen = () => {
    setSearch('');
    setIsSearchOn(isSearchOn => !isSearchOn);
  };

  const inputSearch = e => {
    setSearch(e.target.value);
    request();
  };

  if (values) {
    filterValue.current = values.filter(result => {
      if (!search.startsWith(' ')) {
        return result.name.includes(search);
      }
    });
  }
  if (isShowNavbar) {
    return (
      <div className="Nav">
        <div className="header">
          {isSearchOn && (
            <div className="clickBox" onClick={handleSearchOpen} />
          )}
          {search && isSearchOn && (
            <div className="clickBox" onClick={handleSearchOpen}>
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
                    {filterValue.current.length === 0 ? (
                      <span>검색결과가 없습니다.</span>
                    ) : (
                      filterValue.current.map((data, index) => {
                        return (
                          <SearchCard
                            key={data.id}
                            {...data}
                            cardSize="Small"
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="inner">
            <div className="link">
              <Link to="/main">
                <h1 className="navLogoTitle">KLEENEX</h1>
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
                      autoFocus
                    />
                  </div>
                </div>
              ) : (
                <ul>
                  {LINK_DATA.map((data, index) => {
                    return (
                      <span key={index}>
                        <Link to={data.link} className="link">
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
                {localStorage.Token ? (
                  <div>
                    <span>
                      <li onClick={logOut}>로그아웃</li>
                      <li>&nbsp;|&nbsp; </li>
                    </span>
                    {RIGHT_TOP_DATA_LOGIN.map(data => {
                      return (
                        <span key={data.id}>
                          <Link to={`${data.link}`}>
                            <li>{data.name}</li>
                          </Link>
                          <li>&nbsp;|&nbsp; </li>
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  RIGHT_TOP_DATA.map(data => {
                    return (
                      <span key={data.id}>
                        <Link to={`${data.link}`}>
                          <li>{data.name}</li>
                        </Link>
                        <li>&nbsp;|&nbsp; </li>
                      </span>
                    );
                  })
                )}
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
  { className: 'about', name: 'ABOUT', link: '/main' },
  { className: 'shop', name: 'SHOP', link: '/products' },
];

const RIGHT_TOP_DATA = [
  { id: 1, name: '로그인', link: '/login' },
  { id: 2, name: '주문/배송', link: '/main' },
  { id: 3, name: '장바구니', link: '/cart' },
  { id: 4, name: '문의', link: '/main' },
];

const RIGHT_TOP_DATA_LOGIN = [
  { id: 1, name: '주문/배송', link: '/main' },
  { id: 2, name: '장바구니', link: '/cart' },
  { id: 3, name: '문의', link: '/main' },
];

const LAST_LINK_DATA = [
  { name: 'MUSEUM', className: 'museum' },
  { name: 'TERA TIMES', className: 'teraTimes' },
  { name: 'LOCATIONS', className: 'locations' },
];
