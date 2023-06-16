import React from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import "../styles/checkoutsuccess.css"



const CheckOutSuccess = () => {

  return  (
    <Helmet>
      <CommonSection title="Checkouted Successfully">
      </CommonSection>
      <h1>Congratulations! You have Successfully paid amount to our stripe account</h1>
    </Helmet>
  )
}

export default CheckOutSuccess