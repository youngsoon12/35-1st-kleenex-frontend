import React from 'react';
import InProduct from './InProduct/InProduct';
import { THEAD_DATA, ORDER_BUTTON } from '../Cart/Data/Data';
import './InShoppingCart.scss';

const InShoppingCart = ({
  toMinusNum,
  toPlusNum,
  toDeleteCheckedItem,
  toDeletaAllItem,
  value,
  isCheckedBox,
  itemsPrice,
  shipmentPrice,
  totalPrice,
}) => {
  return (
    <div className="inShoppingCart">
      <div className="cartBox">
        <div className="cartTitle">
          <p>장바구니 상품({value.length})</p>
        </div>
        <div className="cartTableContainer">
          <table className="cartBoxTable">
            <thead>
              <tr>
                {THEAD_DATA.map(data => {
                  return (
                    <th
                      key={data.colSpan + data.value}
                      className={data.className}
                      colSpan={data.colSpan}
                    >
                      {data.value}
                    </th>
                  );
                })}
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
                    totalPrice={totalPrice}
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
                {itemsPrice.toLocaleString()}
                <span>원</span>
              </span>
            </div>
            <div className="plusIcon">
              <i class="bx bxs-plus-circle" />
            </div>
            <div className="shipmentPayment">
              <span className="totalFeeText">총 배송비</span>
              <span className="productFee">
                {shipmentPrice.toLocaleString()}
                <span>원</span>
              </span>
            </div>
          </div>
          <div className="rightTotalPrice">
            <span className="totalOrderText">총 주문금액</span>
            <span className="finalOrderPrice">
              {totalPrice.toLocaleString()}
              <span>원</span>
            </span>
          </div>
        </div>
        <div className="cartNotice">
          <span>
            * 발송일 지정 상품과 일반 상품을 같이 구매하는 경우 지정일(정기
            배송의 경우 1차 발송일)에 함께 발송됩니다.
          </span>
          <span>
            * 빠른 배송을 원하시면 발송일 지정 상품과 일반 상품을 별도로
            주문해주시기 바랍니다.
          </span>
        </div>
        <div className="cartButtonContainer">
          <div className="toDeleteButtonContainer">
            <div className="choiceDeleteButton" onClick={toDeleteCheckedItem}>
              <span>선택상품 삭제</span>
            </div>
            <div className="TotalDeleteButton" onClick={toDeletaAllItem}>
              <span>전체상품 삭제</span>
            </div>
          </div>
          <div className="toOrderButtonContainer">
            {ORDER_BUTTON.map((data, i) => {
              return (
                <div key={data.value + i} className={data.className}>
                  {i === 1 ? <i class="bx bxs-gift" /> : ''}
                  <span>{data.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InShoppingCart;
