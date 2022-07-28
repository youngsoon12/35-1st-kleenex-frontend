import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterToP from './RegisterToP';
import { CONFIG_URL } from '../../config';
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    name: '',
    userName: '',
    paswWord: '',
    passWordCheck: '',
    address: '',
    phoneNumber1: '',
    phoneNumber2: '',
    email: '',
  });

  const onChange = e => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const REGEX_USERNAME = /^[A-Za-z0-9]{4,12}$/;
  const REGEX_PASSWORD =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const REGEX_EMAIL = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const REGEX_PHONE_NUMBER = /\d{3}-\d{4}-\d{4}/;

  const signUp = e => {
    e.preventDefault();
    if (person.name.length > 0) {
      if (REGEX_USERNAME.test(person.userName)) {
        if (
          REGEX_PASSWORD.test(person.passWord) &&
          person.passWord === person.passWordCheck
        ) {
          if (person.address.length > 0) {
            if (REGEX_EMAIL.test(person.email)) {
              if (
                REGEX_PHONE_NUMBER.test(
                  `010-${person.phoneNumber1}-${person.phoneNumber2}`
                )
              ) {
                fetch(`${CONFIG_URL}/user/signup`, {
                  method: 'POST',
                  body: JSON.stringify({
                    name: person.name,
                    username: person.userName,
                    password: person.passWord,
                    address: person.address,
                    email: person.email,
                    phone_number: `010-${person.phoneNumber1}-${person.phoneNumber2}`,
                  }),
                })
                  .then(res => res.json())
                  .then(result => {
                    navigate('/register/success', { state: { person } });
                  });
              } else alert('휴대전화 번호를 다시 확인해주세요');
            } else alert('이메일 양식을 다시 확인해주세요');
          } else alert('주소란은 필수 입니다.');
        } else alert('비밀번호 양식을 다시 확인해주세요');
      } else alert('아이디 양식을 다시 확인해주세요');
    } else alert('이름란은 필수입니다.');
  };

  return (
    <div className="Register">
      <div className="wrap">
        <div className="container">
          <RegisterToP />
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
                      name="name"
                      onChange={onChange}
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
                    <input
                      className="inputInfo"
                      name="userName"
                      onChange={onChange}
                    />
                    {person.userName.length > 0 &&
                      (REGEX_USERNAME.test(person.userName) ? (
                        <span>{`${person.userName}은 사용가능한 아이디 입니다.`}</span>
                      ) : (
                        <span className="CheckFail">
                          아이디는 영문소문자 또는 숫자 4~12자로 입력해 주세요.
                        </span>
                      ))}

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
                      name="passWord"
                      onChange={onChange}
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
                      name="passWordCheck"
                      onChange={onChange}
                    />
                    {person.passWordCheck.length > 0 &&
                      (person.passWord === person.passWordCheck ? (
                        ''
                      ) : (
                        <span className="CheckFail">
                          비밀번호가 일치하지 않습니다.
                        </span>
                      ))}
                  </td>
                </tr>
                <tr>
                  <th>
                    <div>주소</div>
                  </th>
                  <td>
                    <input
                      className="inputInfo"
                      name="address"
                      onChange={onChange}
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
                        name="phoneNumber1"
                        onChange={onChange}
                      />
                    </span>
                    <span>-</span>
                    <span>
                      <input
                        className="inputPhoneNumber"
                        name="phoneNumber2"
                        onChange={onChange}
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
                      name="email"
                      onBlur={onChange}
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
