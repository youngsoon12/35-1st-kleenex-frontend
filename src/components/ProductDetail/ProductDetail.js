import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiArrowDropUpLine, RiArrowDropDownLine } from 'react-icons/ri';
import { ImCross } from 'react-icons/im';
import './ProductDetail.scss';

export default function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState([]);
  const [imageSelect, setImageSelect] = useState('');
  const [order, setOrder] = useState({
    graind: '',
    size: '',
    quantity: 1,
  });
  const [ordersList, setOrdersList] = useState([]);

  // ProductDetail 데이터 통신
  async function request() {
    // const res = await fetch(
    //   `http://10.58.3.145:8000/products/${params.product_id}`
    // );
    const res = await fetch('/data/productDataDetail.json');
    const result = await res.json();
    setDetail(result.product_detail);
  }

  useEffect(() => {
    request();
  }, []);

  // 주문 옵션 핸들러
  const productOptionHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    if (order.graind === value) {
      setOrder(prev => ({ ...prev, [name]: '' }));
    } else {
      setOrder(prev => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (order.size !== '') {
      const prevOrdersList = [...ordersList];
      prevOrdersList.push(order);
      setOrdersList(prevOrdersList);
      setOrder({ graind: '', size: '', quantity: 1 });
    }
  }, [order]);

  // 주문리스트 서버 전송 데이터 통신
  const ordersListJsonify = async e => {
    e.preventDefault();
    const POSTOrders = {};
    POSTOrders.product_id = params.product_id;
    POSTOrders.product = ordersList;
    let JSONOut = {
      product_id: POSTOrders.product_id,
      product: POSTOrders.product,
    };

    const request = await fetch('http://10.58.7.4:8000/cart/cart', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify(JSONOut),
    });

    const result = await request.json();

    if (result.MESSAGE === 'SUCCESS') {
      navigate('/cart');
    }
  };

  const qttIncrease = id => {
    const prevOrdersList = [...ordersList];
    prevOrdersList[id].quantity++;
    setOrdersList(prevOrdersList);
  };

  const qttDecrease = id => {
    const prevOrdersList = [...ordersList];
    if (prevOrdersList[id].quantity > 1) prevOrdersList[id].quantity--;
    setOrdersList(prevOrdersList);
  };

  const orderDelete = id => {
    const prevOrdersList = [...ordersList];
    prevOrdersList.splice(id, 1);
    setOrdersList(prevOrdersList);
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
                {imageSelect === '' ? (
                  <img src={detail.img[0].img_url} alt="thumbnail" />
                ) : (
                  <img src={imageSelect} alt="thumbnail" />
                )}
              </div>
              <div className="awaitingImages">
                <img
                  src={detail.img[0].img_url}
                  alt="thumbnail"
                  onClick={() => {
                    setImageSelect(detail.img[0].img_url);
                  }}
                />
                <img
                  src={detail.img[1].img_url}
                  alt="thumbnail"
                  onClick={() => {
                    setImageSelect(detail.img[1].img_url);
                  }}
                />
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
                          className={`${
                            Number(order.graind) === grind.graind_id
                              ? 'highlighted'
                              : ''
                          }`}
                          name="graind"
                          key={grind.graind_id}
                          value={grind.graind_id}
                          onClick={productOptionHandler}
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
                          className={`${!!order.graind ? false : true}`}
                          name="size"
                          key={size.size_id}
                          value={size.size_name}
                          onClick={productOptionHandler}
                          disabled={!!order.graind ? false : true}
                        >
                          {size.size_name}
                        </button>
                      ))}
                    </div>
                    <p>[필수] 중량 선택</p>
                  </div>
                </div>
              </form>

              <div className="ordersList">
                <div className="ordersWrapper">
                  {ordersList.map((order, index) => {
                    return (
                      <div className="order" key={index}>
                        <div className="orderInfo">
                          <div className="orderTitle">{detail.name}</div>
                          <div className="orderOption">
                            <p>
                              {order.graind}/{order.size}
                            </p>
                          </div>
                        </div>
                        <div className="orderQuantity">
                          <div className="QuantityControl">
                            <input
                              className="txtQuantityControl"
                              type="text"
                              value={order.quantity}
                            />
                            <div className="btnQuantityControl">
                              <button
                                className="increase btn"
                                onClick={() => qttIncrease(index)}
                              >
                                <RiArrowDropUpLine />
                              </button>
                              <button
                                className="decrease btn"
                                onClick={() => qttDecrease(index)}
                              >
                                <RiArrowDropDownLine />
                              </button>
                            </div>
                            <button
                              className="delete"
                              onClick={() => orderDelete(index)}
                            >
                              <ImCross />
                            </button>
                          </div>
                        </div>
                        <div className="orderPrice">
                          <p>
                            {detail.size.map(size => {
                              return order.size === size.size_name
                                ? Math.floor(size.size_price).toLocaleString()
                                : '';
                            })}
                            원
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="totalFee">
                <p>
                  총 상품금액<span>0</span>
                </p>
              </div>

              <form className="actionButtonWrapper">
                <div className="btnTop">
                  <button className="giftButton btnPreset">선물하기</button>
                  <button
                    className="cartButton btnPreset"
                    onClick={e => ordersListJsonify(e)}
                  >
                    장바구니
                  </button>
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
