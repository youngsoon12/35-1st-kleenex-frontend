import React from 'react';
import './inProduct.scss';

const InProduct = ({
  image,
  product,
  size,
  graind,
  id,
  price,
  quantity,
  toMinusNum,
  toPlusNum,
  onChangeHandle,
  isCheckedBox,
  data,
  totalPrice,
}) => {
  return (
    <tr>
      <td className="bodyCheckBox">
        <input type="checkbox" onClick={isCheckedBox} />
      </td>
      <td className="bodyImage">
        <img alt="" src={image} />
      </td>
      <td className="bodyProductName">{product}</td>
      <td className="bodySelectedOption">
        [옵션 : {graind}/{size}]
      </td>
      <td className="bodyMarketPrice">
        {Math.floor(price).toLocaleString()}원
      </td>
      <td className="bodyProductQty">
        <div className="switchNumber">
          <div className="minusBox" onClick={toMinusNum}>
            <i class="bx bx-minus" />
          </div>
          <input type="number" value={quantity} onChange={onChangeHandle} />
          <div className="plusBox" onClick={toPlusNum}>
            <i class="bx bx-plus" />
          </div>
        </div>
      </td>
      <td className="bodyProductFee">
        {quantity * price >= 50000 || totalPrice >= 50000
          ? '무료'
          : (2500).toLocaleString()}
      </td>
      <td className="bodyTotalPrice">
        {(quantity * price).toLocaleString()}원
      </td>
    </tr>
  );
};

export default InProduct;
