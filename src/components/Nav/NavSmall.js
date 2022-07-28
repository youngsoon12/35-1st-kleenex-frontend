import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchCard from './search/SearchCard';
import './NavSmall.scss';

const NavSmall = () => {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [search, setSearch] = useState('');
  const [values, setValues] = useState([]);
  const filterValue = useRef([]);

  async function request() {
    if (!search) {
      setValues([]);
      return;
    }
    const res = await fetch(
      `http://10.58.3.145:8000/products/main/search?keywords=${search}`
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

  useEffect(() => {
    request();
    if (search.length < 1) {
      setValues('');
    }
  }, [search]);

  return (
    <div className="NavSmall">
      <div className="inner">
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
              onBlur={handleSearchOpen}
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
            {iconBarImage.map((data, index) => {
              return (
                <Link to={data.link} key={index}>
                  <li>
                    <img src={`/images/Nav/icon${data.no}.png`} alt="" />
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
  { className: 'about', value: 'ABOUT', link: '/main' },
  { className: 'shop', value: 'SHOP', link: '/products' },
];

const CATEGORY_TWO = [
  { className: 'museum', value: 'MUSEUM', link: '/main' },
  { className: 'teraTimes', value: 'TERA TIMES', link: '/main' },
  { className: 'locations', value: 'LOCATIONS', link: '/main' },
];

const iconBarImage = [
  { no: 1, link: '/login' },
  { no: 2, link: '/login' },
  { no: 3, link: '/cart' },
  { no: 4, link: '/login' },
];
