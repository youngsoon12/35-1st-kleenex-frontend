import { Link } from 'react-router-dom';
import { ImPhone } from 'react-icons/im';
import { FaInstagramSquare } from 'react-icons/fa';
import { UTILITIES, WORKING_TIME, COMPANY_INFO } from './mockData';
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
