import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {motion} from 'framer-motion';

import Helmet from '../components/Helmet/Helmet';
import "../styles/home.css";


import {Container, Row, Col}  from "reactstrap";
import heroImg from '../assets/images/hero-img.png';

import ProductsList from '../components/UI/ProductsList';
import Services from '../services/Services';

import Clock from '../components/UI/Clock';

import counterImg from '../assets/images/counter-timer-img.png';
import useGetData from '../custom-hooks/useGetData';

import sliderImg1 from '../assets/images/slider-image1.jpg';
import sliderImg2 from '../assets/images/slider-image2.jpg';
import sliderImg3 from '../assets/images/slider-image3.jpg';

import { Carousel } from "react-bootstrap";

const Home = () => {

  const {data: products, loading} = useGetData('products');
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setbestSalesProducts] = useState([]);
  const [paintingProducts, setPaintingProducts] = useState([]);
  const [tableProducts, setTableProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(()=>{
    const filteredTrendingProducts = products.filter((item) =>item.category === "chair");

    const filteredBestSalesProducts = products.filter((item) =>item.category === "sofa");

    const filteredPaintingProducts = products.filter((item) =>item.category === "painting");

    const filteredTableProducts = products.filter((item) =>item.category === "table");

    const filteredPopularProducts = products.filter((item) =>item.category === "mirror");


    setTrendingProducts(filteredTrendingProducts);
    setbestSalesProducts(filteredBestSalesProducts);
    setPaintingProducts(filteredPaintingProducts);
    setTableProducts(filteredTableProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return <Helmet title={"Home"}>
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg='6' md='6'>
            <div className="hero__content">
              <p className="hero__subtitle">Trending Product in {year}</p>
              <h2>Make Your Interior More Minimalistic & Modern</h2>
              <p>Browse through our extensive collection of furniture, meticulously curated to cater to diverse tastes and lifestyles. From sleek and modern to timeless and classic, our range encompasses a wide array of styles, ensuring there's something for everyone.</p>
              <motion.button whileTap={{scale: 1.2}} className="buy__btn"><Link to="/shop">SHOP NOW</Link></motion.button>
            </div>
          </Col>
          <Col lg='6' md='6'>
            <div className="hero__img">
              <img src={heroImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <Services/>
    <section className="trending__products">
      <Container>
        <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'>Trending Products</h2>
          </Col>
          {
            loading ? <h5 className='fw-bold'>Loading....</h5> :
            <ProductsList data={trendingProducts}/> 
          }
        </Row>
      </Container>
    </section>

    <section>
      <div className='carousel-container'>
        <Container>
          <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'>Featured Gallery</h2>
          </Col>
    <Carousel interval={2000}>
    <Carousel.Item>
    <img
      className="d-block w-100"
      src={sliderImg3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Master Sofa Set I</h3>
      <p>"Absolutely love the sofa set! It has completely transformed my living room into a cozy and stylish space."
        <br />
        -Maham Arshad
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={sliderImg1}
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Master Sofa Set II</h3>
      <p>"The cushions are incredibly comfortable, and the upholstery feels luxurious to the touch. The design is modern and sleek, making it a perfect fit for my contemporary decor."
        <br />
        -Zainab Kashif
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={sliderImg2}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Master Sofa Set III</h3>
      <p>"The quality is outstanding, and I can tell it's built to last. I highly recommend this sofa set to anyone looking for both comfort and style!"
        <br />
        -Alayna Khalid
      </p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</Row>
</Container>
</div>
    </section>

    <section className="best__sales">
      <Container>
      <Row>
          <Col lg='12' className='text-center'>
            <h2 className='section__title'>Best Sales</h2>
          </Col>
          {
            loading ? <h5 className='fw-bold'>Loading....</h5> :
            <ProductsList data={bestSalesProducts}/> 
          }
        </Row>
      </Container>
    </section>
    <section className="timer__count">
      <Container>
        <Row>
          <Col lg='6' md='12' className='count__down-col'>

            <div className="clock__top-content">
              <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
              <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
            </div>
            <Clock/>
            <motion.button whileTap={{scale: 1.2}} className="buy__btn store__btn"><Link to="/shop">Visit Store</Link></motion.button>
          </Col>
          <Col lg='6' md='12' className='text-end counter__img'>
            <img src={counterImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
    
    <section className="new__arrivals">
      <Container>
        <Row>
        <Col lg='12' className='text-center mb-5'>
            <h2 className='section__title'>New Arrivals</h2>
          </Col>
          {
            loading ? <h5 className='fw-bold'>Loading....</h5> :
            <ProductsList data={paintingProducts}/> 
          }
        </Row>
      </Container>
    </section>
<section className="popular__category">
  <Container>
    <Row>
        <Col lg='12' className='text-center mb-5'>
            <h2 className='section__title'>Popular in Category</h2>
          </Col>
          {
            loading ? <h5 className='fw-bold'>Loading....</h5> :
            <ProductsList data={tableProducts}/> 
          }
          {
            loading ? <h5 className='fw-bold'>Loading....</h5> :
            <ProductsList data={popularProducts}/> 
          }
        </Row>
  </Container>
</section>
  </Helmet>;
};

export default Home;