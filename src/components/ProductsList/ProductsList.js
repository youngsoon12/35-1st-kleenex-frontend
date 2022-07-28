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
  }

  useEffect(() => {
    request(location.search);
  }, [location.search]);

  const updateOffset = buttonIndex => {
    const queryString = `?page=${buttonIndex}`;
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
        {products.map(product => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              eng_name={product.eng_name}
              img={product.img[0].img_url}
              taste={product.taste.map(taste => taste.taste_name)}
              roasting_date={product.roasting_date}
              price={product.price}
              cardSize="Med"
            />
          );
        })}
      </div>
      <Buttons updateOffset={updateOffset} totalItems={totalItems} />
    </section>
  );
}
