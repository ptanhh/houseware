import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";
import image from "../../assets/images/logo-r3.png";

import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();



  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  console.log(userInfo);
  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);

  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    console.log("dang xat");
    dispatch(SignoutUser());
  };

  const SearchProduct = async (e) => {
    e.preventDefault()
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch('')
  };

  return (
    <div className="header">
      <section id="menu">
        <div className="logo">
          <span>
            <Link to="/">
              <img src={image} alt="logo" />
            </Link>
          </span>
        </div>
        <div className="search centered-search">
          <form onSubmit={(e) => SearchProduct(e)}>
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm ..."
              defaultValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <SearchOutlined onClick={(e) => SearchProduct(e)}></SearchOutlined>
            {/* <button type="submit" onClick={(e) => SearchProduct(e)}>Search</button> */}
          </form>
        </div>
        <ul className="menu-list" id={menu ? "hidden" : ""}>
          <li className="header-text">
            <Link to="/product"> Sản Phẩm </Link>
          </li>
          {userInfo ? (
            <li className="header-text" onClick={() => setShowAccount2(!showAccount2)}>
              <Link>
                {userInfo.name}
                <DownOutlined style={{ fontSize: "12px" }} />
              </Link>
              {showAccount2 ? (
                <div className="menu-drop">
                  {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
                  <Link to="/myOrder">Đơn hàng</Link>
                  <Link onClick={() => handleSignout()}>Đăng xuất</Link>
                </div>
              ) : (
                ""
              )}
            </li>
          ) : (
            <li style={{fontWeight: '400'}} onClick={() => setShowAccount(!showAccount)}>
              <Link>
                Tài khoản
                <DownOutlined style={{ fontSize: "12px" }} />
              </Link>

              {showAccount ? (
                <ul className="menu-drop">
                  <li>
                    <Link to="/register">Đăng kí</Link>
                  </li>
                  <li>
                    <Link to="/login">Đăng nhập</Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </li>
          )}
          <li className="shop-cart">
            <Link to="/cart" className="shop-cart">
              <ShoppingCartOutlined
                style={{ fontSize: "30px" }}
              ></ShoppingCartOutlined>
              <span className="count"> {amount} </span>
            </Link>
          </li>
        </ul>
        <div className="bar" onClick={() => setMenu(!menu)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </section>
    </div>
  );
}

export default Header;
