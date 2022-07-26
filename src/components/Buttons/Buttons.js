import React from 'react';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { FaAngleDoubleRight } from 'react-icons/fa';
import './Buttons.scss';

export default function Buttons({ updateOffset, totalItems }) {
  const buttonMaker = () => {
    const result = [];

    result.push(
      <button className="pageBtn" onClick={() => updateOffset(1)}>
        <FaAngleDoubleLeft />
      </button>
    );

    for (let i = 0; i < Math.ceil(totalItems / 12); i++) {
      result.push(
        <button className="pageBtn nums" onClick={() => updateOffset(i + 1)}>
          {i + 1}
        </button>
      );
    }

    result.push(
      <button
        className="pageBtn"
        onClick={() => updateOffset(Math.ceil(totalItems / 12))}
      >
        <FaAngleDoubleRight />
      </button>
    );

    return result;
  };
  return <div className="pageBtnWrapper">{buttonMaker()}</div>;
}
