import { MdOutlineShoppingBag } from 'react-icons/md';
import './SearchCard.scss';

export default function SearchCard({
  id,
  img,
  name,
  eng_name,
  // details,
  // roastedDate,
  price,
  cardSize,
}) {
  return (
    <section className="searchCard">
      {console.log(typeof price)}
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
            <p>{price.slice(0, price.indexOf('.'))}원</p>
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </section>
  );
}
