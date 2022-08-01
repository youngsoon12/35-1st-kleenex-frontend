import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Register from './pages/register/Register';
import RegisterSuccess from './pages/register/RegisterSuccess';
import Products from './pages/Products/Products';
import ProductsList from './components/ProductsList/ProductsList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/products" element={<Products />}>
          <Route path="" element={<ProductsList />} />
          <Route path=":product_id" element={<ProductDetail />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
