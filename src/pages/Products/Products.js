import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_MENU } from './ProductsData';
import ProductsList from '../../components/ProductsList/ProductsList';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import './Products.scss';

export default function Product() {
  const [icon, iconChange] = useState('plus');

  const iconHandler = () => {
    return icon === 'plus' ? iconChange('minus') : iconChange('plus');
  };

  return (
    <div className="product">
      <div className="productContainer">
        <div className="leftPanel">
          <div className="menuTitle">SHOP</div>
          <ul className="categoryList">
            {CATEGORY_MENU.map(values => (
              <li className="categoryMenu" key={values.id}>
                <Link to="">{values.catName}</Link>
                {values.innerCatList.length > 0 ? (
                  <span
                    className={`expandIcon ${icon}`}
                    onClick={() => iconHandler()}
                  />
                ) : null}
                <ul className={`expandableMenu${icon}`}>
                  {values.innerCatList.map((innerValues, index) => (
                    <li className="" key={index}>
                      <Link to={innerValues.innerCatURL}>
                        {innerValues.innerCatName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        {/* <ProductsList /> */}
        <ProductDetail />
      </div>
    </div>
  );
}
