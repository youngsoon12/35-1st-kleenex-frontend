import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import Buttons from '../Buttons/Buttons';
import './ProductsList.scss';

export default function ProductList() {
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  async function request(search) {
    // const res = await fetch(`http://10.58.1.165:8000/products${search}`);
    const res = await fetch('/data/productDataList.json');
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
          return <ProductCard key={product.id} {...product} cardSize="Med" />;
        })}
      </div>
      <Buttons updateOffset={updateOffset} totalItems={totalItems} />
    </section>
  );
}
