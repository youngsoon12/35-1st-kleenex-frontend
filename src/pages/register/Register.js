import React from 'react';
import './Register.scss';

const Register = () => {
  return (
    <div className="Register">
      <div className="wrap">
        <div className="container">
          <div className="path">
            <ul>
              <li>회원가입</li>
              <li>
                HOME
                <i class="bx bx-chevron-right" />{' '}
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
              <tr>
                <th>
                  <div>이름</div>
                </th>
                <td>
                  <input className="inputInfo" />
                </td>
              </tr>
              <tr>
                <th>
                  <div>아이디</div>
                </th>
                <td>
                  <input className="inputInfo" />
                  <span className="inputTip">(영문소문자/숫자, 4~16자)</span>
                </td>
              </tr>
              <tr>
                <th>
                  <div>비밀번호</div>
                </th>
                <td>
                  <input className="inputInfo" />
                  <span className="inputTip">
                    (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)
                  </span>
                </td>
              </tr>
              <tr>
                <th>
                  <div>비밀번호 확인</div>
                </th>
                <td>
                  <input className="inputInfo" />
                </td>
              </tr>
              <tr>
                <th>
                  <div>주소</div>
                </th>
                <td>
                  <input className="inputInfo" />
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
                    <input className="inputPhoneNumber" />
                  </span>
                  <span>-</span>
                  <span>
                    <input className="inputPhoneNumber" />
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
                  <input className="inputInfo" />
                  <span className="inputTip">
                    <span>이메일 수신</span>
                    <input type="checkbox" />
                    <span>동의함</span>
                  </span>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
      <div class="footer" />
    </div>
  );
};

export default Register;
const INPUT_DATA = [
  { th: '이름' },
  { th: '아이디' },
  { th: '비밀번호' },
  { th: '비밀번호 확인' },
  { th: '주소' },
];
