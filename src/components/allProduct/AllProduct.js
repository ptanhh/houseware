import React, { useEffect } from 'react';
import ListProduct from './ListProduct'
import './Sale.css'
import { handlePercentDiscount } from '../../untils/index'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../actions/ProductAction';

import FilterProduct from './FilterProduct';
import SortByPrice from './SortByPrice/SortByPrice';
import FilterMenu from "./FilterMenu/FilterMenu";


function AllProduct(props) {
    const dispatch = useDispatch()

    const product = useSelector(state => state.allProduct.product)

    useEffect(() => {
        dispatch(getAllProduct())

        return () => {
            return []
        }
    }, [dispatch])

    return (
        <section id="hotsale">
            <div className="hotsale">
                <FilterMenu></FilterMenu>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <SortByPrice className="SortByPrice"></SortByPrice>
                <FilterProduct className="FilterProduct"></FilterProduct>
                </div>
                {
                    product && product.length > 0 ? (<ListProduct HotSaleProducts={handlePercentDiscount(product)}></ListProduct>) : (<span>Không có sản phẩm</span>)
                }
            </div>
        </section>

    );
}


export default AllProduct;