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
      console.log('실험');
      return;
    }
    const res = await fetch(
      `http://10.58.3.145:8000/products/main/search?keywords=${search}`
    );
    const result = await res.json();
    setValues(result.result);
    console.log('result', result);
  }

  const handleSearchOpen = () => {
    setSearch('');
    setIsSearchOn(isSearchOn => !isSearchOn);
  };

  const inputSearch = e => {
    setSearch(e.target.value);
    console.log(search);
    request();
  };

  if (values) {
    filterValue.current = values.filter(result => {
      if (!search.startsWith(' ')) {
        return result.name.includes(search);
      }
    });
  }
  console.log('search', search);
  console.log('value', values);

  useEffect(() => {
    request();
  }, [search]);

  return (
    <div className="NavSmall">
      <div className="inner">
        <div className="first">
          <Link to="/">
            <div className="smallNavLogoTitle">KLEENEX</div>
            {/* <img src="/images/Nav/NavSmallLogo.png" alt="로고" /> */}
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
          </div>
        )}
        <div className="categoryOne">
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
