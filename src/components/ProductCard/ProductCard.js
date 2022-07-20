import { useState, useEffect } from 'react';
import { MdOutlineShoppingBag } from 'react-icons/md';
import './ProductCard.scss';

export default function ProductCard() {
  const [values, setValues] = useState({
    imgURL: '',
    korTitle: '',
    engTitle: '',
    details: '',
    roastedDate: '',
    price: '',
  });

  useEffect(() => {
    fetch('http://localhost:3000/data/productCard.json')
      .then(res => res.json())
      .then(res => {
        setValues(res.MOCK_DATA);
      });
  }, []);

  return (
    <section className="productCard">
      <div className="cardContainer">
        <div className="cardThumbnail">
          <img src={values[0].imgURL} alt="thumbnail" />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">{values[0].korTitle}</div>
            <div className="engTitle">{values[0].engTitle}</div>
          </div>
          <div className="discription">
            <div className="details">{values[0].details}</div>
            <div className="roastedDate">
              <div className="roastLeft">로스팅</div>
              <div className="roastRight">{values[0].roastedDate}</div>
            </div>
          </div>
          <div className="price">
            <p>{values[0].price}원</p>
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </section>
  );
}
