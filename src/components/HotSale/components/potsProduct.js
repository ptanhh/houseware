import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'

import {handlePercentDiscount} from '../../../untils/index'
import { useDispatch} from 'react-redux';


function PotsProduct(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('Các loại nồi');
    const [hotPotProduct, setHotPotProduct] = useState([])

    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.get(`/products/${name}`)
                setHotPotProduct(data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchApi()
    }, [])

    return (
        <section id="hotsale">
            <div className="hotsale">
                <h2>{name}</h2>
                {
                    hotPotProduct ? (<ListProduct HotSaleProducts={handlePercentDiscount(hotPotProduct)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default PotsProduct;