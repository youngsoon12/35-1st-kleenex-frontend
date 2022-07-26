import { MdOutlineShoppingBag } from 'react-icons/md';
import './SearchCard.scss';

export default function SearchCard({
  id,
  img,
  name,
  eng_name,
  price,
  cardSize,
}) {
  return (
    <section className="searchCard">
      <div className="cardContainer">
        <div className={'cardThumbnail' + cardSize}>
          <img src={img[0].img_url} alt="thumbnail" />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">{name}</div>
            <div className="engTitle">{eng_name}</div>
          </div>
          <div className="price">
            <p>{Math.floor(price).toLocaleString('ko-KR')}원</p>
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </section>
  );
}
