import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';

function Login() {
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  });
  const [response, setResponse] = useState();
  const navigate = useNavigate();
  const isChecked = useRef(false);

  const body = JSON.stringify({
    username: inputValue.id,
    password: inputValue.password,
  });

  console.log('inputValue', inputValue);

  const postLogin = async () => {
    const request = await fetch('http://10.58.1.67:8000/user/signin', {
      method: 'POST',
      body: body,
    });
    const result = await request.json();
    setResponse(result);

    switch (result.MESSAGE) {
      case 'DOESNOTEXIST':
        alert('아이디가 존재하지 않습니다.');
        break;
      case 'INVALID_USER':
        alert('패스워드가 틀렸습니다.');
        break;
      case 'LOGIN SUCCESS':
        localStorage.setItem('Token', result.ACCESS_TOKEN);
        localStorage.setItem('UserId', inputValue.id);
        navigate('/main');
        break;
    }
  };

  console.log(response);

  const onCheckedBox = () => {
    !isChecked.current
      ? (isChecked.current = true)
      : (isChecked.current = false);
  };

  const onSubmit = e => {
    e.preventDefault();
    postLogin();
  };

  const idRegExp = /^[A-Za-z0-9]{4,12}$/;
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const isValid =
    idRegExp.test(inputValue.id) && passwordRegExp.test(inputValue.password);

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
            <form className="loginForm" onSubmit={onSubmit}>
              <h3 className="loginBoxTitle">회원 조회</h3>
              <input
                type="text"
                placeholder="아이디"
                name="id"
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
                  <i
                    class={
                      isChecked
                        ? 'bx bxs-check-square bx-sm '
                        : 'bx bx-check-square bx-sm '
                    }
                    onClick={onCheckedBox}
                  />
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
