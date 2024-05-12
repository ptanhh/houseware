import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'

import {handlePercentDiscount} from '../../../untils/index'
import { useDispatch } from 'react-redux';


function GrindersProduct(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('Máy xay đa năng');
    const [hotGrinderProduct, setHotGrinderProduct] = useState([])

    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.get(`http://localhost:5000/products/${name}`)
                setHotGrinderProduct(data)
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
                   hotGrinderProduct ? (<ListProduct HotSaleProducts={handlePercentDiscount(hotGrinderProduct)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default GrindersProduct;