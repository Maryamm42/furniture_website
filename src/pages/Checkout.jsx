import React, { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const Secrect_key =
  "pk_test_51NH3ilIs3daH4HlpxZAgWb93haIHMOfKBR4FoLlTGTB65BCaCBixu3Ws9PNq5mFwdVcWDkkES5qhQuv3hi1EhSuh00M7nDnjMA";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterPhone, setEnterPhone] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [enterPostalCode, setEnterPostalCode] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [stripe, setStripe] = useState(null);
  const [priceId, setPriceId] = useState("");

  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();

  useEffect(() => {
    const getStripe = async () => {
      const stripeObject = await loadStripe(Secrect_key);
      setStripe(stripeObject);
    };
    getStripe();
  }, []);

  const generatePriceId = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4242/api/generate-priceID",
        {
          price: totalAmount,
          quantity: totalQty,
          shipcost: "0",
        }
      );

      const { priceId } = response.data;
      setPriceId(priceId);
      console.log(priceId);
      if (priceId !== undefined || "") {
        handlePayment();
      }
    } catch (error) {
      console.error("Failed to generate Price ID:", error);
    }
  };

  const handlePayment = async () => {
    if (priceId !== "") {
      try {
        const response = await axios.post(
          "http://localhost:4242/api/create-checkout",
          {
            priceId: priceId,
            quantity: totalQty,
          }
        );

        const { sessionId } = response.data;

        if (stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: sessionId,
          });

          if (result.error) {
            console.error("Failed to redirect to Checkout:", result.error);
          }
        }
      } catch (error) {
        console.error("Failed to create Checkout Session:", error);
      }
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dbRef = collection(db, "buyerInfo");
      const data = {
        BuyerName: enterName,
        BuyerEmail: enterEmail,
        BuyerPhone: enterPhone,
        BuyerAddress: enterAddress,
        BuyerCity: enterCity,
        BuyerPostalCode: enterPostalCode,
        BuyerCountry: enterCountry,
      };
      addDoc(dbRef, data).then(async (docRef) => {
        toast.success("Order placed successfully");
        setLoading(false);
        setEnterName("");
        setEnterEmail("");
        setEnterCity("");
        setEnterAddress("");
        setEnterCountry("");
        setEnterPhone("");
        setEnterPostalCode("");
        await generatePriceId();

        dispatch(cartActions.resetTotal());

        navigate("/home");
      });
    } catch (err) {
      setLoading(false);
      toast.error("Order not placed!");
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form" onSubmit={placeOrder}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    onChange={(e) => setEnterName(e.target.value)}
                    value={enterName}
                    placeholder="Enter your name"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="textemail"
                    onChange={(e) => setEnterEmail(e.target.value)}
                    value={enterEmail}
                    placeholder="Enter your email"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    onChange={(e) => setEnterPhone(e.target.value)}
                    value={enterPhone}
                    placeholder="Phone number"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    onChange={(e) => setEnterAddress(e.target.value)}
                    value={enterAddress}
                    placeholder="Street address"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    onChange={(e) => setEnterCity(e.target.value)}
                    value={enterCity}
                    placeholder="City"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    onChange={(e) => setEnterPostalCode(e.target.value)}
                    value={enterPostalCode}
                    placeholder="Postal Code"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    onChange={(e) => setEnterCountry(e.target.value)}
                    value={enterCountry}
                    placeholder="Country"
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <button type="submit" className="buy__btn new__btn w-100">
                    Place an order
                  </button>
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping: <br />
                    free shipping
                  </span>{" "}
                  <span>$0</span>
                </h6>
                <h4>
                  Total Cost: <span>${totalAmount}</span>
                </h4>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
