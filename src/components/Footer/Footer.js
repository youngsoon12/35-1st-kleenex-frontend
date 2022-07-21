import { Link } from 'react-router-dom';
import { ImPhone } from 'react-icons/im';
import { FaInstagramSquare } from 'react-icons/fa';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <section className="footerContainer">
        <article className="utilMenu">
          <div className="utilMenuContainer">
            {UTILITIES.map(values => (
              <>
                <div key={values.id}>
                  <Link to="">{values.util}</Link>
                </div>
                {values.id === UTILITIES.length ? '' : <span>|</span>}
              </>
            ))}
          </div>
        </article>
        <article className="contact">
          <div className="contactContainer">
            <div className="customerCenter contactDivPreset">
              <p className="textTitle">CUSTOMER CENTER</p>
              <p className="textOffice">
                <ImPhone />
                070-4914-9248
              </p>
              <div className="textCustomerCenter textDetails">
                {WORKING_TIME.map(values => (
                  <p key={values.id}>
                    {values.timeDivision}
                    <span>{values.Specifictime}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="bankInfo contactDivPreset">
              <p className="textTitle">BANK INFO</p>
              <div className="textBankInfo textDetails">
                <p>
                  신한은행<span>110-474-658716</span>
                </p>
                <p>
                  예 금 주<span>(주)학산</span>
                </p>
              </div>
            </div>

            <div className="companyInfo contactDivPreset">
              <div className="textCompanyInfo textDetails">
                {COMPANY_INFO.map(values => (
                  <p key={values.id}>
                    {values.title}
                    <span>
                      {values.value}
                      {values.id === 6 ? (
                        <span className="spanBtn">[사업자정보확인]</span>
                      ) : (
                        ''
                      )}
                    </span>
                  </p>
                ))}
              </div>
              <div className="copyright">
                ⓒ2022 Team KLEENEX Wecode. ALL RIGHT RESERVED.
              </div>
              <div className="sns">
                <FaInstagramSquare />
                <Link to="">@Team KLEENEX</Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </footer>
  );
}

const UTILITIES = [
  {
    id: 1,
    util: '이용약관',
  },
  {
    id: 2,
    util: '개인정보처리방침',
  },
  {
    id: 3,
    util: '구매안전서비스 가입사실 확인',
  },
];

const WORKING_TIME = [
  {
    id: 1,
    timeDivision: '평일',
    Specifictime: '09:00 ~ 18:00',
  },
  {
    id: 2,
    timeDivision: '점심',
    Specifictime: '09:00 ~ 18:00',
  },
  {
    id: 3,
    timeDivision: '휴무',
    Specifictime: '토/일/공휴일은 휴무',
  },
];

const COMPANY_INFO = [
  {
    id: 1,
    title: '상호',
    value: '(주)학산',
  },
  {
    id: 2,
    title: '대표이사',
    value: '김용덕',
  },
  {
    id: 3,
    title: '주소',
    value: '서울시 강남구 테헤란로 427',
  },
  {
    id: 4,
    title: '통신판번호',
    value: '2003-강원강릉-0085',
  },
  {
    id: 5,
    title: '계좌번호',
    value: '신한은행 110-474-658716 (주)학산',
  },
  {
    id: 6,
    title: '사업자등록번호',
    value: '012-34-56789',
  },
  {
    id: 7,
    title: '개인정보보호책임자',
    value: '김용덕',
  },
  {
    id: 8,
    title: '원두도매문의',
    value: '010-8765-4321',
  },
  {
    id: 9,
    title: '매장이용문의',
    value: '02-1234-5678',
  },
  {
    id: 10,
    title: '레스토랑문의',
    value: '010-1234-5678',
  },
  {
    id: 11,
    title: '이메일',
    value: 'info@kleenex.wecode.io',
  },
];
