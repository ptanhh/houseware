import React, { useEffect, useState } from 'react';
import axios from 'axios'
import ListProduct from '../ListProduct'
import {handlePercentDiscount} from '../../../untils/index'
import { useDispatch } from 'react-redux';


function FansProduct(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('Quạt, Máy làm mát');
    const [hotFan, setHotFan] = useState([])
    useEffect(() => {
        async function FetchApi(){
            try {
                const {data} = await axios.get(`/products/${name}`)
                setHotFan(data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchApi()
    }, [])

   

    return (
        <section id="hotsale fan">
            <div className="hotsale">
                <h2>{name}</h2>
                {
                    hotFan ? (<ListProduct HotSaleProducts={handlePercentDiscount(hotFan)}></ListProduct>) : ''
                }
            </div>
        </section>

    );
}


export default FansProduct;