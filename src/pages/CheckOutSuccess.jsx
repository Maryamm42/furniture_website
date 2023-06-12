import React from 'react';
import { Carousel } from "react-bootstrap";
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import "../styles/checkoutsuccess.css"
import sliderImg1 from '../assets/images/slider-image1.jpg';
import sliderImg2 from '../assets/images/slider-image2.jpg';
import sliderImg3 from '../assets/images/slider-image3.jpg';


const CheckOutSuccess = () => {

  return  <Carousel interval={1000}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={sliderImg3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First Slide</h3>
      <p>Some description for the first slide</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={sliderImg1}
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Second Slide</h3>
      <p>Some description for the second slide</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={sliderImg2}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Third Slide</h3>
      <p>Some description for the third slide</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  
}

export default CheckOutSuccess