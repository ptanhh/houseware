import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider11 from "../../assets/images/sliders/slide1.webp"
import slider12 from "../../assets/images/sliders/slide2.webp"
import slider13 from "../../assets/images/sliders/slide3.webp"
import banner1 from "../../assets/images/banners/banner1.png"
import banner2 from "../../assets/images/banners/banner2.png"

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: 'none' }}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let { slider, slider1, slider2 } = props
  const [nav, setNav] = useState({ nav1: null, nav2: null })

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2
    })
  }, [])

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  const next = () => {
    console.log(slider1)
    slider1.slickNext();
  }
  const previous = () => {
    slider2.slickPrev();
  }

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider asNavFor={nav.nav2}
              ref={slider => (slider1 = slider)}
              {...settings} >
              <div key={1}>
                <img src={banner2} alt=""></img>
              </div>
              <div key={2}>
                <img src={slider11} alt=""></img>
              </div>
              <div key={3}>
                <img src={slider13} alt=""></img>
              </div>
            </Slider>
            <div className='carousel-left-move' onClick={() => previous()}>
              <div className="prev">
                <LeftOutlined></LeftOutlined>
              </div>
              <div className="next" onClick={() => next()}>
                <RightOutlined></RightOutlined>
              </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider asNavFor={nav.nav1}
              ref={slider => (slider2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
            >

              <div>
                UY TÍN <br></br> Ưu đãi vô địch
              </div>
              <div>
                CHÍNH HÃNG  <br></br>  Hotsale giảm sập sàn
              </div>
              <div>
                SẢN PHẨM THÔNG MINH  <br></br>  Cuộc sống dễ dàng hơn
              </div>
              <div>
                SÁNG TẠO, TIỆN LỢI  <br></br>  Trong từng sản phẩm
              </div>
              <div>
                DỄ DÀNG, NHANH CHÓNG   <br></br>   Tiện lợi hơn bao giờ hết
              </div>

            </Slider>
          </div>
        </div>
        <div className="carousel-right">
          <div className="carousel-right-item">
            <img src={slider12} alt=""></img>
          </div>
          <div className="carousel-right-item">
            <img src={banner1} alt=""></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
