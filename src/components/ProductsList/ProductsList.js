import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import Buttons from '../Buttons/Buttons';
import { CONFIG_URL } from '../../config';
import './ProductsList.scss';

export default function ProductList() {
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  async function request(search) {
    const res = await fetch(`${CONFIG_URL}/products${search}`);
    // const res = await fetch('/data/productDataList.json');
    const result = await res.json();
    setTotalItems(result.total);
    setProducts(result.shop_product_list);
    console.log('totalItem', result);
  }
  console.log('location', location.search);
  console.log('url', `${CONFIG_URL}/products${location.search}`);

  useEffect(() => {
    request(location.search);
  }, [location.search]);

  const updateOffset = buttonIndex => {
    const limit = 12;
    const offset = (buttonIndex - 1) * limit;
    const queryString = `?offset=${offset}&limit=${limit}`;
    navigate(queryString);
  };

  return (
    <section className="rightPanel">
      <header className="listHeader">
        <h3>SHOP</h3>
        <p>
          <span>HOME ＜</span> SHOP
        </p>
      </header>
      <div className="listContainer">
        {products.map(
          ({ id, name, eng_name, img, taste, roasting_date, price }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                eng_name={eng_name}
                img={img[0].img_url}
                taste={taste.map(taste => taste.taste_name)}
                roasting_date={roasting_date}
                price={price}
                cardSize="Med"
              />
            );
          }
        )}
      </div>
      <Buttons updateOffset={updateOffset} totalItems={totalItems} />
    </section>
  );
}
