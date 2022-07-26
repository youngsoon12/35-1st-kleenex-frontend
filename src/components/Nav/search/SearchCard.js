import { MdOutlineShoppingBag } from 'react-icons/md';
import './SearchCard.scss';

export default function SearchCard({
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
    <section className="searchCard">
      <div className="cardContainer">
        <div className={'cardThumbnail' + cardSize}>
          <img src={imgURL} alt="thumbnail" />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">{korTitle}</div>
            <div className="engTitle">{engTitle}</div>
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
