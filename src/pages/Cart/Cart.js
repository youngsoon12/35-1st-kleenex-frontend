import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cart.scss';

const Cart = () => {
  const [num, setNum] = useState(1);

  const toMinusNum = () => {
    if (num === 0) {
      return;
    }
    return setNum(prev => prev - 1);
  };

  const toPlusNum = () => {
    return setNum(prev => prev + 1);
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
          <div className="cartBox">
            <div className="cartTitle">
              <p>장바구니 상품(1)</p>
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
                  <tr>
                    <td className="bodyNum1">
                      <input type="checkbox" />
                    </td>
                    <td className="bodyNum2">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                      />
                    </td>
                    <td className="bodyNum3">7월 킹콩 피지 서머 블랜드</td>
                    <td className="bodyNum4">옵션</td>
                    <td className="bodyNum5">53000원</td>
                    <td className="bodyNum6">
                      <div className="switchNumber">
                        <div className="minusBox" onClick={toMinusNum}>
                          <i class="bx bx-minus" />
                        </div>
                        <input
                          type="number"
                          value={num}
                          onChange={e => setNum(e.target.value)}
                        />
                        <div className="plusBox" onClick={toPlusNum}>
                          <i class="bx bx-plus" />
                        </div>
                      </div>
                    </td>
                    <td className="bodyNum7">무료</td>
                    <td className="bodyNum8">53000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cartTotalPrice">
              <div className="leftTotalPrice">
                <div className="productTotal">
                  <span className="totalPriceText">상품구매합계</span>
                  <span className="productPrice">
                    83000<span>원</span>
                  </span>
                </div>
                <div className="plusIcon">
                  <i class="bx bxs-plus-circle"></i>
                </div>
                <div className="shipmentPayment">
                  <span className="totalFeeText">총 배송비</span>
                  <span className="productFee">
                    0<span>원</span>
                  </span>
                </div>
              </div>
              <div className="rightTotalPrice">
                <span className="totalOrderText">총 주문금액</span>
                <span className="finalOrderPrice">
                  83000<span>원</span>
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
                <div className="choiceDeleteButton">
                  <span>선택상품 삭제</span>
                </div>
                <div className="TotalDeleteButton">
                  <span>전체상품 삭제</span>
                </div>
              </div>
              <div className="toOrderButtonContainer">
                <div className="selectOrder">
                  <span>선택상품 주문</span>
                </div>
                <div className="present">
                  <i class="bx bxs-gift"></i>
                  <span>선물하기</span>
                </div>
                <div className="allOrder">
                  <span>전체상품 주문</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
