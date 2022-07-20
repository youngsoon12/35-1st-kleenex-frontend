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
        console.log(res);
        setValues(res);
      });
  }, []);

  return (
    <section className="productCard">
      <div className="cardContainer">
        <div className="cardThumbnail">
          <img src={values.imgURL} alt="thumbnail" />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">{values.korTitle}</div>
            <div className="engTitle">{values.engTitle}</div>
          </div>
          <div className="discription">
            <div className="details">{values.details}</div>
            <div className="roastedDate">
              <div className="roastLeft">로스팅</div>
              <div className="roastRight">{values.roastedDate}</div>
            </div>
          </div>
          <div className="price">
            <p>{values.price}원</p>
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </section>
  );
}
