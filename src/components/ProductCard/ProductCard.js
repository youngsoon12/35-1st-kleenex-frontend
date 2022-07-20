import { MdOutlineShoppingBag } from 'react-icons/md';
import './ProductCard.scss';

export default function ProductCard({
  id,
  imgURL,
  korTitle,
  engTitle,
  details,
  roastedDate,
  price,
  cardSize,
}) {
  return (
    <section className="productCard">
      <div className="cardContainer">
        <div className={'cardThumbnail' + cardSize}>
          <img src={imgURL} alt="thumbnail" />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">{korTitle}</div>
            <div className="engTitle">{engTitle}</div>
          </div>
          <div className="discription">
            <div className="details">{details}</div>
            <div className="roastedDate">
              <div className="roastLeft">로스팅</div>
              <div className="roastRight">{roastedDate}</div>
            </div>
          </div>
          <div className="price">
            <p>{price}원</p>
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </section>
  );
}
