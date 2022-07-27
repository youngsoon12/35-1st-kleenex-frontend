import React from 'react';
import { Link } from 'react-router-dom';

const RegisterToP = () => {
  return (
    <div>
      <div className="path">
        <ul>
          <li>회원가입</li>
          <li>
            <Link to="/main">HOME</Link>
            <i className="bx bx-chevron-right" />{' '}
          </li>
        </ul>
      </div>
      <div className="titleArea">
        <div className="logo">
          <div className="logo1">J0IN</div>
          <div className="logo2">회원가입</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterToP;
