import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineShoppingBag } from 'react-icons/md';
import './SearchCard.scss';
import Nav from '../Nav';

export default function SearchCard({
  id,
  img,
  name,
  eng_name,
  price,
  cardSize,
}) {
  const navigate = useNavigate();

  const goToDetail = e => {
    return navigate(`/products/detail/${id}`);
  };

  return (
    <section className="searchCard" key={id}>
      <div className="cardContainer" onClick={goToDetail}>
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
