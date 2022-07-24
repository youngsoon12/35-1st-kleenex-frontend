import React from 'react';
import './inProduct.scss';

const InProduct = ({
  url,
  productName,
  option,
  id,
  price,
  quantity,
  toMinusNum,
  toPlusNum,
  delivery,
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
        <img alt="" src={url} />
      </td>
      <td className="bodyNum3">{productName}</td>
      <td className="bodyNum4">{option}</td>
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
      <td className="bodyNum7">{delivery}</td>
      <td className="bodyNum8">{quantity * price}원</td>
    </tr>
  );
};

export default InProduct;
