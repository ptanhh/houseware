import React from 'react';
import './Footer.css'
import { Link } from "react-router-dom";
import image from "../../assets/images/logo-r3.png";


function Footer(props) {
    return (
        <section id="footer">
            <div className="footer">
                <div className="footer-top">
                    <div className="footer-top-name">
                        <Link to="/">
                            <img style={{ width: '70px' }} src={image} alt="logo" />
                        </Link>
                    </div>
                    <div className="footer-top-about">
                        {/* <h2>Giới thiệu</h2>
                        <ul>
                            <li>
                                <a>Về Chúng Tôi</a>
                            </li>
                            <li>
                                <a>Page</a>
                            </li>
                        </ul> */}
                    </div>
                    <div className="footer-top-delivery">
                        {/* <h2>Khung giờ hỗ trợ</h2>
                        <p>Hỗ trợ 039.9249.381 (07:00-21:00)</p> */}
                    </div>
                    <div className="footer-top-sp">
                        <h2>Khung giờ hỗ trợ</h2>
                        <p>Thời gian: 7:00 - 22:00</p>
                        <p>HOTLINE: 039.9249.381</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;