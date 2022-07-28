import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Register.scss';
import RegisterToP from './RegisterToP';

const RegisterSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  return (
    <div className="RegisterSuccess">
      <RegisterToP />
      <div className="signUpShow">
        <div className="message">
          <p>회원가입이 정상적으로 완료 되었습니다!</p>
          <span>{user.person.name} 님</span>은 [아라비카] 회원이십니다.
        </div>
        <div>
          <button
            className="goMain"
            onClick={() => {
              navigate('/main');
            }}
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
