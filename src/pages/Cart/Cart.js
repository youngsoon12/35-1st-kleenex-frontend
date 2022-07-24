import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InProduct from './InProduct/InProduct';
import './cart.scss';

const Cart = () => {
  const [value, setValues] = useState([]);
  const [itemsPrice, setItemsPrice] = useState([]);
  const shipmentPrice = itemsPrice > 50000 ? 0 : 2500;
  const totalPrice = itemsPrice + shipmentPrice;

  // 첫 화면 렌더링 시 개인 카트 데이터를 요청합니다.
  async function request() {
    const res = await fetch('http://10.58.7.167:8000/cart/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('Token'),
      },
    });
    const result = await res.json();
    setValues(result.MESSAGE);
    // 상품들의 합계를 구해 업데이트 해줍니다.
    setItemsPrice(result.MESSAGE.reduce((a, c) => a + c.price * c.quantity, 0));
  }

  // 렌더링 이후 request 를 불러옵니다.
  useEffect(() => {
    request();
  }, []);

  // 카트 아이템의 수량을 1씩 감소시켜 이후 바로 서버에 전송합니다.
  const toMinusNum = id => {
    const copyValue = [...value];
    const selectedId = value.findIndex(product => product.cart_id === id);
    copyValue[selectedId].quantity === 1
      ? (copyValue[selectedId].quantity = 1)
      : (copyValue[selectedId].quantity -= 1);
    setValues(copyValue);

    // 서버에 patch 로 전달
    fetch('http://10.58.7.167:8000/cart/cart', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify({
        cart_id: copyValue[selectedId].cart_id,
        quantity: copyValue[selectedId].quantity,
      }),
    }).then(res => res.json());
    setItemsPrice(value.reduce((a, c) => a + c.price * c.quantity, 0));
  };

  // 수량을 1씩 더해 서버에 전송합니다.
  const toPlusNum = id => {
    const copyValue = [...value];
    const selectedId = value.findIndex(product => product.cart_id === id);
    copyValue[selectedId].quantity += 1;
    setValues(copyValue);

    fetch('http://10.58.7.167:8000/cart/cart', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify({
        cart_id: copyValue[selectedId].cart_id,
        quantity: copyValue[selectedId].quantity,
      }),
    }).then(res => res.json());
    setItemsPrice(value.reduce((a, c) => a + c.price * c.quantity, 0));
  };

  // 체크박스로 각 아이템을 선택합니다.
  const isCheckedBox = id => {
    const copyValue = [...value];
    const selectedId = value.findIndex(product => product.cart_id === id);
    return copyValue[selectedId].is_checked === false
      ? ((copyValue[selectedId].is_checked = true), setValues(copyValue))
      : ((copyValue[selectedId].is_checked = false), setValues(copyValue));
  };

  // 선택된 아이템을 카트에서 삭제합니다.
  const toDeleteCheckedItem = () => {
    const copyValue = [...value];
    const isCheckedProduct = value.filter(
      product => product.is_checked === true
    );
    const filterValue = copyValue.filter(
      product => product.is_checked !== true
    );
    const filterCartId = isCheckedProduct.map(product => product.cart_id);

    fetch('http://10.58.7.167:8000/cart/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify({
        cart_id: filterCartId,
      }),
    }).then(res => res.json());
    setValues(filterValue);
    setItemsPrice(filterValue.reduce((a, c) => a + c.price * c.quantity, 0));
  };

  // 모든 아이템을 한번에 삭제합니다.
  const toDeletaAllItem = () => {
    const filterValue = [];

    fetch('http://10.58.7.167:8000/cart/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify({
        is_bool: 'True',
      }),
    }).then(res => res.json());
    setValues(filterValue);
    setItemsPrice(filterValue.reduce((a, c) => a + c.price * c.quantity, 0));
  };

  return (
    <div className="cart">
      <div className="container">
        <div className="cartContainer">
          <div className="path">
            <ol>
              <li>
                <Link to="/main">HOME</Link>
              </li>
              <i class="bx bxs-chevron-right" />
              <li>
                <Link to="/cart">장바구니</Link>
              </li>
            </ol>
          </div>
          <div className="cartTitleContainer">
            <h2>
              <strong>SHOPPING CART</strong>
              <span>장바구니</span>
            </h2>
          </div>
          {value.length !== 0 ? (
            <div className="cartBox">
              <div className="cartTitle">
                <p>장바구니 상품({value.length})</p>
              </div>
              <div className="cartTableContainer">
                <table className="cartBoxTable">
                  <thead>
                    <tr>
                      <th className="headNum1">
                        <input type="checkbox" />
                      </th>
                      <th className="headNum2" colSpan={2}>
                        상품명
                      </th>
                      <th className="headNum3">선택옵션</th>
                      <th className="headNum4">판매가</th>
                      <th className="headNum5">수량</th>
                      <th className="headNum6">배송비</th>
                      <th className="headNum7">합계</th>
                    </tr>
                  </thead>
                  <tbody>
                    {value.map(data => {
                      return (
                        <InProduct
                          key={data.id}
                          {...data}
                          data={data}
                          toMinusNum={() => toMinusNum(data.cart_id)}
                          toPlusNum={() => toPlusNum(data.cart_id)}
                          isCheckedBox={() => isCheckedBox(data.cart_id)}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="cartTotalPrice">
                <div className="leftTotalPrice">
                  <div className="productTotal">
                    <span className="totalPriceText">상품구매합계</span>
                    <span className="productPrice">
                      {itemsPrice}
                      <span>원</span>
                    </span>
                  </div>
                  <div className="plusIcon">
                    <i class="bx bxs-plus-circle" />
                  </div>
                  <div className="shipmentPayment">
                    <span className="totalFeeText">총 배송비</span>
                    <span className="productFee">
                      {shipmentPrice}
                      <span>원</span>
                    </span>
                  </div>
                </div>
                <div className="rightTotalPrice">
                  <span className="totalOrderText">총 주문금액</span>
                  <span className="finalOrderPrice">
                    {totalPrice}
                    <span>원</span>
                  </span>
                </div>
              </div>
              <div className="cartNotice">
                <span>
                  * 발송일 지정 상품과 일반 상품을 같이 구매하는 경우
                  지정일(정기 배송의 경우 1차 발송일)에 함께 발송됩니다.
                </span>
                <span>
                  * 빠른 배송을 원하시면 발송일 지정 상품과 일반 상품을 별도로
                  주문해주시기 바랍니다.
                </span>
              </div>
              <div className="cartButtonContainer">
                <div className="toDeleteButtonContainer">
                  <div
                    className="choiceDeleteButton"
                    onClick={toDeleteCheckedItem}
                  >
                    <span>선택상품 삭제</span>
                  </div>
                  <div className="TotalDeleteButton" onClick={toDeletaAllItem}>
                    <span>전체상품 삭제</span>
                  </div>
                </div>
                <div className="toOrderButtonContainer">
                  <div className="selectOrder">
                    <span>선택상품 주문</span>
                  </div>
                  <div className="present">
                    <i class="bx bxs-gift" />
                    <span>선물하기</span>
                  </div>
                  <div className="allOrder">
                    <span>전체상품 주문</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cartBox">
              <div className="toComment">
                <i class="bx bx-cart" />
                <p>장바구니가 비어있습니다.</p>
              </div>
              <div className="cartButtonContainer">
                <div className="toDeleteButtonContainer" />
                <div className="toOrderButtonContainer">
                  <div className="selectOrder">
                    <span>선택상품 주문</span>
                  </div>
                  <div className="present">
                    <i class="bx bxs-gift" />
                    <span>선물하기</span>
                  </div>
                  <div className="allOrder">
                    <span>전체상품 주문</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

// const THEAD_NAME = [
//   {
//     id: 1,
//     url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
//     productName: '인도네시아 판탄 무사라',
//     option: '[옵션: 에스프레소/100g]',
//     price: 50000,
//     quentity: 1,
//     delivery: '무료',
//   },
//   {
//     id: 2,
//     url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
//     productName: '인도네시아 판탄 무사라',
//     option: '[옵션: 에스프레소/100g]',
//     price: 50000,
//     quentity: 1,
//     delivery: '무료',
//   },
//   {
//     id: 3,
//     url: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
//     productName: '인도네시아 판탄 무사라',
//     option: '[옵션: 에스프레소/100g]',
//     price: 50000,
//     quentity: 1,
//     delivery: '무료',
//   },
// ];
