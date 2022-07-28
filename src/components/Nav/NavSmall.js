import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchCard from './search/SearchCard';
import './NavSmall.scss';
import { CONFIG_URL } from '../../config';

const NavSmall = () => {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([]);
  const [isToken, setIsToken] = useState(false);
  const filterValue = useRef([]);
  const location = useLocation();

  async function request() {
    if (!search) {
      setValues([]);
      return;
    }
    const res = await fetch(
      `${CONFIG_URL}/products/main/search?keywords=${search}`
    );
    const result = await res.json();
    setValues(result.result);
  }

  const handleSearchOpen = () => {
    setSearch('');
    setIsSearchOn(isSearchOn => !isSearchOn);
  };

  const inputSearch = e => {
    request();
    setSearch(e.target.value);
  };

  if (values) {
    filterValue.current = values.filter(result => {
      if (!search.startsWith(' ')) {
        return result.name.includes(search);
      }
    });
  }
  useEffect(() => {}, location);

  useEffect(() => {
    request();
    if (search.length < 1) {
      setValues('');
    }
  }, [search]);

  const logOut = () => {
    localStorage.removeItem('Token');
    return setIsToken(isToken => !isToken);
  };

  return (
    <div className="NavSmall">
      <div className="inner">
        {isSearchOn && <div className="clickBox" onClick={handleSearchOpen} />}
        {search && isSearchOn && (
          <div className="searchSmallBox">
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
                  <span>검색결과가 없습니다</span>
                ) : (
                  filterValue.current.map((data, index) => {
                    return (
                      <SearchCard key={data.id} {...data} cardSize="Small" />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
        <div className="first">
          <Link to="/main">
            <div className="smallNavLogoTitle">KLEENEX</div>
          </Link>
        </div>
        {isSearchOn && (
          <div className="searchTag">
            <input
              placeholder="검색"
              className="searchBar"
              onChange={inputSearch}
              autoFocus
            />
          </div>
        )}
        <div className="categoryOne">
          {isSearchOn || (
            <ul>
              {CATEGORY_ONE.map((data, index) => {
                return (
                  <Link to={data.link} key={index}>
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
                <Link to={data.link} key={index}>
                  <li className={data.className}>{data.value}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="iconBar">
          <ul>
            {localStorage.Token ? (
              <div>
                <li>
                  <img src="/images/Nav/icon1.png" alt="" onClick={logOut} />
                  fuk
                </li>
                {iconBarImage.map((data, index) => {
                  return (
                    <Link to={data.link} key={index}>
                      <li>
                        <img src={`/images/Nav/icon${data.no}.png`} alt="" />
                      </li>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <li>
                    <img src="/images/Nav/icon1.png" alt="" />
                  </li>
                </Link>
                {iconBarImage.map((data, index) => {
                  return (
                    <Link to={data.link} key={index}>
                      <li>
                        <img src={`/images/Nav/icon${data.no}.png`} alt="" />
                      </li>
                    </Link>
                  );
                })}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavSmall;

const CATEGORY_ONE = [
  { className: 'about', value: 'ABOUT', link: '/main' },
  { className: 'shop', value: 'SHOP', link: '/products' },
];

const CATEGORY_TWO = [
  { className: 'museum', value: 'MUSEUM', link: '/main' },
  { className: 'teraTimes', value: 'TERA TIMES', link: '/main' },
  { className: 'locations', value: 'LOCATIONS', link: '/main' },
];

const iconBarImage = [
  { no: 2, link: '/main' },
  { no: 3, link: '/cart' },
  { no: 4, link: '/main' },
];
