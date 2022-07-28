import React from 'react';
import './EmptyCart.scss';

const EmptyCart = () => {
  return (
    <div className="emptyCart">
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
    </div>
  );
};

export default EmptyCart;
