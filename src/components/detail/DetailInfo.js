import React from 'react';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../../actions/CartAction'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../untils/index'
import { StarOutlined } from '@ant-design/icons'

function DetailInfo(props) {
    const dispatch = useDispatch()
    const { product } = props;

    function handleAddProduct(product) {
        const action = AddToCart(product)
        dispatch(action)
    }

    const countReview = product.reviews.length
    let averageRate = Math.floor(product.reviews.reduce((a,c) => a + c.star, 0) / countReview)

    const starElems = [];
    const maxStars = 5;

    for (let i = 0; i < maxStars; i++) {
        if (i < averageRate) {
            starElems.push(<StarOutlined key={i} style={{ fontSize: '16px', color: 'orange', fontWeight: 'bolder', paddingBottom: '3px' }} />);
        } else {
            starElems.push(<StarOutlined key={i} style={{ fontSize: '16px', color: '#ccc', fontWeight: 'bolder', paddingBottom: '3px' }} />);
        }
    }

    const percentDiscount = 100 - Math.round(product.salePrice * 100 / product.price) ;
    const status = product.amount > 0 ? 'Còn hàng' : 'Hết hàng';
    
    return (
        <div className="detail-info-right">
            <div className="detail-info-right-price">
                <div style={{borderBottom: '1px solid #a77743', marginBottom: '20px'}}>
                <p style={{marginBottom: '1px'}}>
                    <span className="rating-box">{starElems}</span> 
                    <span className="rating-box-rate">&nbsp;({product.reviews.length} Đánh giá)</span>
                </p>
                <p>
                    <span className="type-box">Thuộc loại: {product.type}</span> 
                </p>
                </div>
                <p className="price-box">
                    <span className="saleprice">{formatPrice(product.salePrice)}đ</span>
                    <span className="old-price"><strong className="price">{formatPrice(product.price)}đ</strong> &nbsp;&nbsp;&nbsp;</span>
                    <span className="percentDiscount">-{percentDiscount}%</span>
                </p>
                <p>
                    <span className="status-box">Trạng thái: {status}</span>
                </p>
                <p className="detail-info-sale">
                    Sản phẩm thuộc chương trình CHÍNH HÃNG - Hotsale sập sàn!
                </p>
            </div>

            <div className="detail-info-right-buy">
                <div className="detail-info-right-buy-now">
                    <Link to="/cart" onClick={() => handleAddProduct(product)}>
                        <strong>MUA NGAY</strong>
                        <br></br>
                        <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DetailInfo;