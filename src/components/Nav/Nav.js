import React, { useState, useEffect } from 'react';
import './nav.scss';

function Nav() {
  const [isScroll, setIsScroll] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        setIsScroll(false);
      } else {
        setIsScroll(true);
      }
    });

    return window.removeEventListener('scroll', () => {});
  }, []);

  if (isScroll) {
    return (
      <div className="nav">
        <div className="navContainer">실험</div>
      </div>
    );
  } else {
    return (
      <div className="nav">
        <div className="navContainerSmall">실험</div>
      </div>
    );
  }
}

export default Nav;
