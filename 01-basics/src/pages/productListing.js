import React, {useEffect, useState} from "react";
import APIHandler from "../api/apiHandler";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge'
import Offcanvas from 'react-bootstrap/Offcanvas';

import ProductDetails from "./productDetails";
import SearchForm from "./search-engine";

import { Link } from 'react-router-dom';

export default function ProductListing (){

    const [productsData, setProductsData] = useState();
    const [showSearchForm, setShowSearchForm] = useState(false);
    
    const retrieveAllProducts = async () => {
        try {
            let response = await APIHandler.get('/products');
            console.log('retrieving products', response.data);
            return response.data.products;
        } catch (error) {
            
        }
        
    }
    
    useEffect(() => {
        console.log("test")
        retrieveAllProducts().then((data)=>{
            console.log('Received data from promise', data);
            setProductsData(data);
        })
    },[])

    const handleCloseSearch = () => setShowSearchForm(false);
    const handleShowSearch = () => setShowSearchForm(true);

    return (
        <>
          <body>
            <div className="ms-3 mb-2">
                <Button variant="secondary" onClick={handleShowSearch}>
                    =
                </Button>
                <Offcanvas  show={showSearchForm} 
                            onHide={handleCloseSearch}
                            style={{maxWidth:'280px'}}>
                    <Offcanvas.Header className="pb-1" closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <SearchForm />
                    </Offcanvas.Body>
                </Offcanvas>
                <span className="ms-4" style={{fontWeight:'600', fontSize:'20px'}}>Latest Works</span>
            </div>

            {productsData? (
                <>
                     <Container fluid className="ms-2">
                        <Row xs={1} s={2} md={2} lg={3} xl={4} xxl={5} style={{justifyContent:'flex-start'}}>
                            {productsData.map(product =>  (
                                <>
                                {
                                    product.productVersion.length !== 0 && <Col style={{marginLeft:'0px'}} key={product.id}>
                                        <Card style={{ width: '18rem', marginTop: '10px', marginBottom:'20px'}}>
                                        <Card.Img variant="top" src={product.productVersion[0].image_url} style={{ minHeight: '220px', maxHeight:'220px', objectFit:'contain'}}/>
                                        <Card.Body>
                                            <Card.Title>{product.productName}</Card.Title>
                                            <Card.Text className="mb-1">
                                            {product.description}
                                            </Card.Text>
                                            <div className="mb-2">
                                                {product.productVersion.map((productVersion)=> (
                                                    
                                                    <span key={productVersion.versionName}>
                                                        <Badge bg="secondary">{productVersion.price}</Badge>
                                                    </span>
                                                
                                                ))}
                                            </div>
                                            <Link to={`/products/${product.id}`} element={<ProductDetails />}>
                                                <Button variant="dark"> See Details </Button>
                                            </Link>
                                        </Card.Body>
                                        </Card>             
                                    </Col>
                            }
                                </>)
                            )}
                        </Row>
                    </Container>
                </>
            ) : (<div className="ms-4"> Loading... </div>)
            }
            </body>
        </>
    )
}
