import React from 'react';
import Header from '../components/header/Header';
import Carousel from '../components/Slider/Carousel';
import FProduct from '../components/HotSale/components/fansProduct'
import PProduct from '../components/HotSale/components/potsProduct'
import GProduct from '../components/HotSale/components/grindersProduct';
import Footer from '../components/footer/Footer'
import AppChat from '../components/AppChat/AppChat'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useSelector } from 'react-redux';

function HomePage(props) {
    const {userInfo} = useSelector(state => state.userSignin)
    
    return (
        <div style={{position: 'relative'}}>
            <Header></Header>
            <Carousel></Carousel>
            <FProduct></FProduct>
            <PProduct></PProduct>
            <GProduct></GProduct>
            <Footer></Footer>
            <ScrollToTop></ScrollToTop>
            {
               userInfo && userInfo.isAdmin === false ? (<AppChat></AppChat>) : ""
            }
        </div>
    );
}

export default HomePage;