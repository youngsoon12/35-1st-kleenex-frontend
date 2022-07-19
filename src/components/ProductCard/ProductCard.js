import { MdOutlineShoppingBag } from 'react-icons/md';
import './ProductCard.scss';

export default function ProductCard() {
  return (
    <article className="productCard">
      <div className="cardContainer">
        <div className="cardThumbnail">
          <img
            src="images/kingkong-fizzy-summer-thumbnail.png"
            alt="thumbnail"
          />
        </div>
        <div className="discriptionContainer">
          <div className="titleContainer">
            <div className="korTitle">7월 킹콩 피지 서머 블렌드</div>
            <div className="engTitle">Fizzy Summer Blend</div>
          </div>
          <div className="discription">
            <div className="details">청사과, 자두, 라임, 복숭아, 청량감</div>
            <div className="roastedDate">
              <div className="roastLeft">로스팅</div>
              <div className="roastRight">2022-07-18</div>
            </div>
          </div>
          <div className="price">
            <p>28,000원</p>
            <MdOutlineShoppingBag />
          </div>
        </div>
      </div>
    </article>
  );
}
