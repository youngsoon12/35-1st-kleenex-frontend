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
}) => {
  return (
    <tr>
      <td className="bodyNum1">
        <input type="checkbox" onClick={isCheckedBox} />
      </td>
      <td className="bodyNum2">
        <img alt="" src={image} />
      </td>
      <td className="bodyNum3">{product}</td>
      <td className="bodyNum4">
        [옵션 : {graind}/{size}]
      </td>
      <td className="bodyNum5">{price}원</td>
      <td className="bodyNum6">
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
      <td className="bodyNum7">무료</td>
      <td className="bodyNum8">{quantity * price}원</td>
    </tr>
  );
};

export default InProduct;
