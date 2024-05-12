import React from 'react';
import { formatPrice } from '../../untils/index'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCart, DeleteToCart, DeleteQtyProduct } from '../../actions/CartAction'

Product.propTypes = {

};

function Product(props) {
    const { product } = props
    const dispatch = useDispatch()

    function handleDeleteProduct(product) {
        const action = DeleteToCart(product)
        dispatch(action);
    }

    function handleAddProduct(product) {
        const action = AddToCart(product)
        dispatch(action)
    }

    function handleProductOut(product) {
        const action = DeleteQtyProduct(product)
        dispatch(action)
    }

    const cartItems = useSelector((state) => state.cart.cartItems);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.qty * item.salePrice,
        0
    );

    return (
        <>
            <div className="shopping-cart">

                <div className="column-labels">
                    <label className="product-image">Ảnh sản phẩm</label>
                    <label className="product-details">Tên sản phẩm</label>
                    <label className="product-price">Giá</label>
                    <label className="product-quantity">Số lượng</label>
                    <label className="product-removal">Xoá</label>
                    <label className="product-line-price">Thành tiền</label>
                </div>

                <div className="product">
                    <div className="product-image">
                        <img src={product.image} alt=''></img>
                    </div>
                    <div className="product-details">
                        <div className="product-title">{product.name}</div>
                        {/* <p className="product-description"></p> */}
                    </div>
                    <div className="product-price">{formatPrice(product.salePrice)}</div>
                    <div className="product-quantity">
                        <ul className="button-event">
                            <li style={{ margin: '0' }} onClick={() => handleDeleteProduct(product)} >-</li>
                            <li style={{ margin: '0' }}> {product.qty} </li>
                            <li style={{ margin: '0' }} onClick={() => handleAddProduct(product)} >+</li>
                        </ul>
                    </div>
                    <div className="product-removal">
                        <button className="remove-product" onClick={() => handleProductOut(product)}> Xóa </button>
                    </div>
                    <div className="product-line-price">{formatPrice(product.salePrice * product.qty)}</div>
                </div>


            </div>
        </>

    );
}

export default Product;