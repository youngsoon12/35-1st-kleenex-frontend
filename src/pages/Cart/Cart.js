import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';
import EmptyCart from './EmptyCart';
import InShoppingCart from './InShoppingCart';
import { CONFIG_URL } from '../../config';

const Cart = () => {
  const [value, setValues] = useState([]);
  const [itemsPrice, setItemsPrice] = useState([]);
  const changeQuantity = useRef([]);
  const shipmentPrice = itemsPrice > 50000 ? 0 : 2500;
  const totalPrice = itemsPrice + shipmentPrice;

  // 첫 화면 렌더링 시 개인 카트 데이터를 요청합니다.
  async function request() {
    const res = await fetch(`${CONFIG_URL}/cart/cart`, {
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
    return fetch(`${CONFIG_URL}/cart/cart`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify({
        cart_id: changeQuantity.current.cart_id,
        quantity: changeQuantity.current.quantity,
      }),
    }).then(res => res.json());
  }, [changeQuantity.current.quantity]);

  // 카트 아이템의 수량을 1씩 감소시켜 이후 바로 서버에 전송합니다.
  const toMinusNum = id => {
    const copyValue = [...value];
    const selectedId = value.findIndex(product => product.cart_id === id);
    copyValue[selectedId].quantity === 1
      ? (copyValue[selectedId].quantity = 1)
      : (copyValue[selectedId].quantity -= 1);
    changeQuantity.current = copyValue[selectedId];
    setValues(copyValue);

    // 서버에 patch 로 전달
    fetch(`${CONFIG_URL}/cart/cart`, {
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

    fetch(`${CONFIG_URL}/cart/cart`, {
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

    fetch(`${CONFIG_URL}/cart/cart`, {
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

    fetch(`${CONFIG_URL}/cart/cart`, {
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
            <InShoppingCart
              toMinusNum={toMinusNum}
              toPlusNum={toPlusNum}
              toDeletaAllItem={toDeletaAllItem}
              toDeleteCheckedItem={toDeleteCheckedItem}
              isCheckedBox={isCheckedBox}
              value={value}
              itemsPrice={itemsPrice}
              shipmentPrice={shipmentPrice}
              totalPrice={totalPrice}
            />
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
