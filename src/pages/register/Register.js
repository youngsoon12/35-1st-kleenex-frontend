import React from 'react';
import './Register.scss';

const Register = () => {
  return (
    <div className="Register">
      <div className="nav" />
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
              {inputData.map((data, index) => {
                return (
                  <tr key={index}>
                    <th>
                      <div>{data.th}</div>
                    </th>
                    <td>
                      <input className="inputName" />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th>전화번호</th>
                <td>
                  <select className="phoneFirst" disabled="disabled">
                    <option>010</option>
                  </select>
                  <span>-</span>
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <input className="inputName" />
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
      <div className="footer" />
    </div>
  );
};

const inputData = [
  { th: '이름' },
  { th: '아이디' },
  { th: '비밀번호' },
  { th: '비밀번호 확인' },
  { th: '주소' },
];

export default Register;
