import React from 'react';
import { formatPrice } from '../../untils';
import './ShoppingCart.css'
import ListProduct from './ListProduct'
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useHistory
} from "react-router-dom";

function Cart(props) {
  const history = useHistory()
  const cartItems = useSelector((state) => state.cart.cartItems);
  var userInfo = useSelector((state) => state.userSignin.userInfo);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.qty * item.salePrice,
    0
  );

  const Order = () => {
    if (userInfo) {
      history.push("/order");
    } else {
      alert("ban can dang nhap");
      history.push("/login");
    }
  };

  return (
    <section id="shopping-cart" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%', marginBottom: '1rem' }}>
        <h1>Giỏ hàng</h1>
        
        <div classNameName="shopping-cart">
          {cartItems ? <ListProduct products={cartItems}></ListProduct> : ""}

          <div className="totals">
            <div className="totals-item totals-item-total">
              <label>Tổng tiền</label>
              <div className="totals-value" id="cart-total">{formatPrice(totalPrice)}</div>
            </div>
          </div>

          <Link to="/" classNameName="back">
            Tiếp tục mua hàng
          </Link>

          {totalPrice <= 0 ? (
            ""
          ) : (
            <div classNameName="order">
              <button className="checkout" onClick={Order}>Đặt hàng</button>
            </div>
          )}

        </div>
      </div>
    </section>

  );
};


export default Cart;
