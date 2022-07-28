import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONFIG_URL } from '../../config';
import './Login.scss';

function Login() {
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
  });
  const [isAutoLoginChecked, setIsAutoLoginChecked] = useState(false);

  const isChecked = useRef(false);
  const navigate = useNavigate();

  const isInputValueTrue = () => {
    isChecked.current === true
      ? setInputValue(prev => {
          return { ...prev, id: localStorage.getItem('UserId') };
        })
      : setInputValue(prev => {
          return { ...prev, id: '' };
        });
  };

  // 첫 랜더링 이후 로컬스토리지에서 유저아이디를 확인합니다.
  useEffect(() => {
    if (localStorage.getItem('UserId')) {
      isChecked.current = true;
      setIsAutoLoginChecked(true);
    }
    // 다음 isChecked 에 의해 화면 아이디 렌더링 여부를 결정합니다.
    isInputValueTrue();
  }, []);

  // 체크 여부에 따라 데이터와 화면을 변경해 줍니다.

  const onCheckedBox = () => {
    if (isAutoLoginChecked === false) {
      setIsAutoLoginChecked(true);
      isChecked.current = true;
    } else {
      setIsAutoLoginChecked(false);
      isChecked.current = false;
      localStorage.removeItem('UserId');
    }
  };

  // 서버에게 데이터를 POST

  const postLogin = async () => {
    const request = await fetch(`${CONFIG_URL}/user/signin`, {
      method: 'POST',
      body: JSON.stringify({
        username: inputValue.id,
        password: inputValue.password,
      }),
    });
    const result = await request.json();

    // 서버로 부터 받아오는 메세지로 판단
    switch (result.MESSAGE) {
      case 'DOESNOTEXIST':
        alert('아이디가 존재하지 않습니다.');
        break;
      case 'INVALID_USER':
        alert('패스워드가 틀렸습니다.');
        break;
      case 'LOGIN SUCCESS':
        localStorage.setItem('Token', result.ACCESS_TOKEN);
        if (isAutoLoginChecked === true) {
          // 체크가 되어있다면
          localStorage.setItem('UserId', inputValue.id); // 아이디 저장을 위해 localStorage 에 저장
        }
        navigate('/main');
        break;
      default:
        break;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    postLogin();
  };

  // 유효성 검사
  const onHandleInput = e => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const idRegExp = /^[A-Za-z0-9]{4,12}$/;
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const isValid =
    idRegExp.test(inputValue.id) && passwordRegExp.test(inputValue.password);

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
                value={inputValue.id}
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
                    className={
                      isAutoLoginChecked
                        ? `bx bxs-check-square bx-sm `
                        : `bx bx-check-square bx-sm `
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
              <button
                className={`loginButton ${isValid ? 'valid' : ''}`}
                disabled={!isValid}
              >
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
