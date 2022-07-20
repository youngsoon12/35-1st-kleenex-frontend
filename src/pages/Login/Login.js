import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

function Login() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const emailRegExp =
    /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const passwordRegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const isValid =
    emailRegExp.test(inputValue.email) &&
    passwordRegExp.test(inputValue.password);

  if (isValid) {
    console.log('성공');
  }

  const onHandleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <section className="login">
      <div className="container">
        <div className="loginContainer">
          <div className="path">
            <ol>
              <li>
                <Link to="/main">HOME</Link>
              </li>
              <i class="bx bxs-chevron-right" />
              <li>
                <Link to="/login">로그인</Link>
              </li>
            </ol>
          </div>
          <div className="loginTitleContainer">
            <h2>
              <strong>LOGIN</strong>
              <span>로그인</span>
            </h2>
          </div>
          <div className="loginBox">
            <form className="loginForm">
              <h3 className="loginBoxTitle">회원 조회</h3>
              <input
                type="text"
                placeholder="아이디"
                name="email"
                className="loginInputId"
                onChange={onHandleInput}
              />
              <input
                type="password"
                placeholder="비밀번호"
                name="password"
                className="loginInputPw"
                onChange={onHandleInput}
              />
              <div className="loginOptionCotainer">
                <div className="idKeepingContainer">
                  <i class="bx bx-check-square bx-sm " />
                  <span>아이디 저장</span>
                  <span>
                    <i class="bx bxs-lock" />
                    보안접속
                  </span>
                </div>
                <div className="idSearchingContainer">
                  <span>아이디찾기</span>
                  <div />
                  <span>비밀번호찾기</span>
                </div>
              </div>
              <button className={`loginButton ${isValid ? 'valid' : ''}`}>
                로그인
              </button>
              <div className="registerBox">
                <div className="regiDescription">
                  <span>아직 회원이 아니신가요?</span>
                  <p>
                    크리넥스에 가입하시면 더 많은 혜택을 누리실 수 있습니다.
                  </p>
                </div>
                <div className="registerButton">
                  <span>신규회원가입</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
