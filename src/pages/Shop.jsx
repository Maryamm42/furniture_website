import React,{useState, useEffect} from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import {Container, Row, Col} from "reactstrap"; 
import "../styles/shop.css";
//import products from '../assets/data/products';
import ProductsLists from '../components/UI/ProductsList';
import useGetData from '../custom-hooks/useGetData';


const Shop = () => {
  
  const {data: products, loading} = useGetData('products');
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const handleFilter = (e) =>{
    const filterValue = e.target.value;
    if(filterValue==='all'){
      setProductsData(products);
      //loading(filteredProducts);
    }
    if(filterValue==='sofa'){
      const filteredProducts = products.filter((item) => item.category==='sofa');

      setProductsData(filteredProducts);
      //loading(filteredProducts);
    }

    if(filterValue==='painting'){
      const filteredProducts = products.filter((item) => item.category==='painting');

      setProductsData(filteredProducts);
      //loading(filteredProducts);
    }

    if(filterValue==='chair'){
      const filteredProducts = products.filter((item) => item.category==='chair');

      setProductsData(filteredProducts);
      //loading(filteredProducts);
    }

    if(filterValue==='mirror'){
      const filteredProducts = products.filter((item) => item.category==='mirror');

      setProductsData(filteredProducts);
      //loading(filteredProducts);
    }

    if(filterValue==='table'){
      const filteredProducts = products.filter((item) => item.category==='table');

      setProductsData(filteredProducts);
      //loading(filteredProducts);
    }

  };


  const handleSearch = (e) => {
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

    setProductsData(searchedProducts)
    //loading(searchedProducts);
  }


  return <Helmet title = 'Shop'>
    <CommonSection title="Products"/>
    <section>
      <Container>
        <Row>
          <Col lg='3' md='6'>
            <div className='filter__widget'>
              <select onChange={handleFilter}>
                <option value="all">Filter By Category</option>
                <option value="sofa">Sofa</option>
                <option value="painting">Painting</option>
                <option value="chair">Chair</option>
                <option value="mirror">Mirror</option>
                <option value="table">Table</option>
              </select>
            </div>
          </Col>
          <Col lg='3' md='6' className='text-end'>
          <div className='filter__widget'>
              <select>
                <option>Sort By</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
          </Col>
          <Col lg='6' md='12'>
            <div className="search__box">
              <input type='text' placeholder='Search.....' onChange={handleSearch}/>
              <span><i class="ri-search-line"></i></span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section className='pt-0'>  
    <Container>
      <Row>
        {
          products.length === 0? <h1 className='text-center'>No products found!</h1>
          : <ProductsLists data ={productsData}/>
        }
      </Row>
    </Container>
    </section>

  </Helmet>
}

export default Shop