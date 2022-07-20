import React from 'react';
import './NavSmall.scss';
import { Link } from 'react-router-dom';

const NavSmall = () => {
  return (
    <div className="NavSmall">
      <div className="inner">
        <div className="first">
          <Link to="/">
            <img src="./images/Nav/NavSmallLogo.png" alt="" />
          </Link>
        </div>
        <div className="categoryOne">
          <ul>
            <Link to="/">
              <li className="about">ABOUT</li>
            </Link>
            <Link to="/">
              <li className="shop">SHOP</li>
            </Link>
            <Link to="/">
              <li className="search">SEARCH</li>
            </Link>
          </ul>
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
      <div className="box">sdf</div>
    </div>
  );
};

export default NavSmall;
