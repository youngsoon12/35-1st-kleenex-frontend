import { useNavigate, useMatch } from 'react-router-dom';
import { MdOutlineShoppingBag } from 'react-icons/md';
import './ProductCard.scss';

export default function ProductCard({
  id,
  img,
  name,
  eng_name,
  taste,
  roasting_date,
  price,
  cardSize,
}) {
  const navigate = useNavigate();
  const mainMatch = useMatch('/main');
  const productMatch = useMatch('/products');

  const goToDetail = e => {
    e.preventDefault();

    if (mainMatch) {
      return navigate(`/products/${id}`);
    } else if (productMatch) {
      return navigate(`${id}`);
    }
  };

  return (
    <section className="productCard" key={id}>
      <div className="cardContainer" onClick={goToDetail}>
        <div className={'cardThumbnail' + cardSize}>
          <img src={img} alt="thumbnail" />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">{name}</div>
            <div className="engTitle">{eng_name}</div>
          </div>
          <div className="discription">
            <div className="details">{`${taste}`}</div>
            <div className="roastedDate">
              <div className="roastLeft">로스팅</div>
              <div className="roastRight">{roasting_date}</div>
            </div>
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
