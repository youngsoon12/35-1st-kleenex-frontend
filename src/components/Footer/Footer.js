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
            <div>
              <Link to="">이용약관</Link>
            </div>
            <span>|</span>
            <div>
              <Link to="">개인정보처리방침</Link>
            </div>
            <span>|</span>
            <div>
              <Link to="">구매안전서비스 가입사실 확인</Link>
            </div>
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
                <p>
                  평일 <span>09:00 ~ 18:00</span>
                </p>
                <p>
                  점심 <span>12:00 ~ 13:00</span>
                </p>
                <p>
                  휴무 <span>토/일/공휴일은 휴무</span>
                </p>
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
                <p>
                  상호<span>(주)학산</span>
                </p>
                <p>
                  대표이사<span>김용덕</span>
                </p>
                <p>
                  주소<span>서울시 강남구 테헤란로 427</span>
                </p>
                <p>
                  통신판번호<span>2003-강원강릉-0085</span>
                </p>
                <p>
                  계좌번호<span>신한은행 110-474-658716 (주)학산</span>
                </p>
                <p>
                  사업자등록번호
                  <span>
                    226-81-28273
                    <span className="spanBtn">[사업자정보확인]</span>
                  </span>
                </p>
                <p>
                  개인정보보호책임자<span>김첨지</span>
                </p>
                <p>
                  원두도매문의<span>010-1234-5678</span>
                </p>
                <p>
                  매장이용문의<span>02-1234-5678</span>
                </p>
                <p>
                  레스토랑문의<span>010-8765-4321</span>
                </p>
                <p>
                  이메일<span>info@kleenex.wecode.com</span>
                </p>
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
