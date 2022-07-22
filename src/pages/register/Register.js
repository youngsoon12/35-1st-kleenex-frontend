import { React, useState } from 'react';
import './Register.scss';

const Register = () => {
  const [name, setName] = useState('ds');
  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passWord, setPassWord] = useState('');
  const [passWordCheck, setPassWordCheck] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [email, setEmail] = useState('');

  const REGEX_USERNAME = '^[A-Za-z0-9]{4,12}$';
  const REGEX_PASSWORD =
    '^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$';
  const REGEX_EMAIL = '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  const REGEX_PHONE_NUMBER = '^d{3}-d{3,4}-d{4}$';

  const onChangeUserName = e => {
    const REGEX_USERNAME = '^[A-Za-z0-9]{4,12}$';
    if (!e.target.value || REGEX_USERNAME.test(e.target.value))
      setNameError(false);
    else setNameError(true);
  };

  const signUp = e => {
    e.preventDefault();

    fetch('http://10.58.5.22:8000/user/signup', {
      method: 'post',
      body: JSON.stringify({
        name: name,
        username: userName,
        password: passWord,
        address: address,
        email: email,
        phone_number: `010-${phoneNumber1}-${phoneNumber2}`,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      });
  };

  return (
    <div className="Register">
      <div className="wrap">
        <div className="container">
          <div className="path">
            <ul>
              <li>회원가입</li>
              <li>
                HOME
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
          <div className="inputTitle">기본정보 입력</div>
          <form>
            <table className="inputDataTable">
              <thead>
                <tr>
                  <th>
                    <div>이름</div>
                  </th>
                  <td>
                    <input
                      className="inputInfo"
                      onChange={e => setName(e.target.value)}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <div>아이디</div>
                  </th>
                  <td>
                    <input className="inputInfo" onChange={onChangeUserName} />
                    <span className="inputTip">(영문소문자/숫자, 4~12자)</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>비밀번호</div>
                  </th>
                  <td>
                    <input
                      className="inputInfo"
                      type="password"
                      onChange={e => setPassWord(e.target.value)}
                    />
                    <span className="inputTip">
                      (영문/숫자/특수문자 포함 필수, 8자 이상)
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>비밀번호 확인</div>
                  </th>
                  <td>
                    <input
                      className="inputInfo"
                      type="password"
                      onChange={e => setPassWordCheck(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>주소</div>
                  </th>
                  <td>
                    <input
                      className="inputInfo"
                      onChange={e => setAddress(e.target.value)}
                    />
                    <span className="inputTip">기본 주소</span>
                  </td>
                </tr>
                <tr>
                  <th>휴대전화</th>
                  <td>
                    <select className="phoneFirst" disabled="disabled">
                      <option>010</option>
                    </select>
                    <span>-</span>
                    <span>
                      <input
                        className="inputPhoneNumber"
                        onChange={e => setPhoneNumber1(e.target.value)}
                      />
                    </span>
                    <span>-</span>
                    <span>
                      <input
                        className="inputPhoneNumber"
                        onChange={e => setPhoneNumber2(e.target.value)}
                      />
                    </span>
                    <span className="inputTip">
                      <span>SMS 수신</span>
                      <input type="checkbox" />
                      <span>동의함</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>
                    <input
                      className="inputInfo"
                      onChange={e => setEmail(e.target.value)}
                    />
                    <span className="inputTip">
                      <span>이메일 수신</span>
                      <input type="checkbox" />
                      <span>동의함</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>회원구분</div>
                  </th>
                  <td>
                    <input type="radio" /> 개인회원
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="buttonArea">
              <button className="inputSubmit" onClick={signUp}>
                회원 가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
