import { useEffect, useState } from 'react';
import './ProductDetail.scss';

export default function ProductDetail() {
  const [detail, setDetail] = useState([]);
  const [order, setOrder] = useState({
    grind_option: '',
    size_option: '',
  });
  const [orderLists, setOrderLists] = useState([]);

  console.log('order: ');
  console.log(order);
  console.log('orderLists: ');
  console.log(orderLists);

  async function request() {
    // const res = await fetch(`http://10.58.5.25:8000/products/1`);
    const res = await fetch('/data/productDataDetail.json');
    const result = await res.json();
    setDetail(result.product_detail);
  }

  useEffect(() => {
    request();
  }, []);

  const grindOptionHandler = (e, input) => {
    e.preventDefault();
    const { name } = e.target;

    if (order.grind_option === '') {
      setOrder(() => ({
        [name]: input,
      }));
    } else if (order.grind_option === input) {
      setOrder(() => ({
        [name]: '',
      }));
    }
  };

  const sizeOptionHandler = (e, input) => {
    e.preventDefault();
    const { name } = e.target;

    console.log('prev order');
    console.log(order);
    setOrder({
      ...order,
      [name]: input,
    });
    console.log('after order');
    console.log(order);

    const prevOrderLists = [...orderLists];
    prevOrderLists.push(order);
    setOrderLists(prevOrderLists);
    setOrder({
      grind_option: '',
      size_option: '',
    });
  };

  if (Object.keys(detail).length !== 0) {
    return (
      <section className="rightPanel">
        <header className="listHeader">
          <h3>SHOP</h3>
          <p>
            <span>HOME ＜</span> SHOP
          </p>
        </header>
        <div className="listContainer">
          <article className="description">
            <div className="productImages">
              <div className="productThumbnail">
                <img src={detail.img[0].img_url} alt="thumbnail" />
              </div>
              <div className="awaitingImages">
                <img src={detail.img[0].img_url} alt="thumbnail" />
                <img src={detail.img[1].img_url} alt="thumbnail" />
              </div>
            </div>

            <div className="productDetails">
              <div className="describe">
                <h3 className="productTitle">{detail.name}</h3>
                <div className="defaultPrice">
                  {Math.floor(detail.price).toLocaleString('ko-KR')}원
                </div>
                <div className="productTaste">
                  <p>
                    Tasting Note
                    {detail.taste.map(taste => (
                      <span key={taste.taste_id}>{taste.taste_name}</span>
                    ))}
                  </p>
                </div>
              </div>

              <form className="optionSelect">
                <div className="productRoasting">
                  <div className="indicator">
                    <p>분쇄</p>
                  </div>
                  <div className="buttonDetail">
                    <div className="choiceButtonWrapper">
                      {detail.graind.map(grind => (
                        <button
                          // className={`isSelected_${}`}
                          name="grind_option"
                          key={grind.graind_id}
                          onClick={e => {
                            grindOptionHandler(e, grind.graind_type);
                          }}
                        >
                          {grind.graind_type}
                        </button>
                      ))}
                    </div>
                    <p>[필수] 분쇄 선택</p>
                  </div>
                </div>
                <div className="productMass">
                  <div className="indicator">
                    <p>중량</p>
                  </div>
                  <div className="buttonDetail">
                    <div className="choiceButtonWrapper">
                      {detail.size.map(size => (
                        <button
                          className={`isDisabled_${
                            !!order.grind_option ? false : true
                          }`}
                          name="size_option"
                          key={size.size_id}
                          onClick={e => {
                            sizeOptionHandler(e, size.size_name);
                          }}
                          disabled={!!order.grind_option ? false : true}
                        >
                          {size.size_name}
                        </button>
                      ))}
                    </div>
                    <p>[필수] 중량 선택</p>
                  </div>
                </div>
              </form>

              <div className="totalFee">
                <p>
                  총 상품금액<span>0</span>
                </p>
              </div>

              <form className="actionButtonWrapper">
                <div className="btnTop">
                  <button className="giftButton btnPreset">선물하기</button>
                  <button className="cartButton btnPreset">장바구니</button>
                </div>
                <div className="btnBottom">
                  <button className="purchaseButton btnPreset">구매하기</button>
                </div>
              </form>
            </div>
          </article>
        </div>
      </section>
    );
  } else {
    return <div>로딩중</div>;
  }
}
