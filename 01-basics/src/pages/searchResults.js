import React, {useState, useContext, useEffect} from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge'
import Offcanvas from 'react-bootstrap/Offcanvas';

import ProductDetails from "./productDetails";
import SearchForm from "./search-engine";

import { SearchContext } from "../context/search-context";

import { Link } from 'react-router-dom';

export default function SearchResults (){

    const [showSearchForm, setShowSearchForm] = useState(false);
    const [errorNotification, setErrorNotification] = useState();
    
    const { searchData } = useContext(SearchContext);

    const handleCloseSearch = () => setShowSearchForm(false);
    const handleShowSearch = () => setShowSearchForm(true);

    useEffect(()=>{
        handleCloseSearch();
        setErrorNotification("");

        setTimeout(()=> {
            if (searchData.length === 0){
                setErrorNotification('No item matched search criteria')   
            }
            },1000)
    },[searchData])

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
            </div>

            {searchData? (
                <>
                <h4 className="ms-3">Found Products</h4>
                <p className="ms-3">{errorNotification}</p>
                    <Container fluid>
                        <Row xs={1} s={2} md={2} lg={3} xl={4} xxl={5} style={{justifyContent:'flex-start'}}>
                            {searchData.map(product =>  
                                <Col style={{marginLeft:'0px'}}>
                                    <Card style={{ width: '18rem', marginTop: '10px', marginBottom:'20px'}}>
                                    <Card.Img variant="top" src={product.productVersion.image_url} style={{ minHeight: '220px', maxHeight:'220px'}}/>
                                    <Card.Body>
                                        <Card.Title>{product.productName}</Card.Title>
                                        <Card.Text className="mb-1">
                                        {product.description}
                                        </Card.Text>
                                        <Card.Text className="mb-1">
                                        price: ${product.productVersion.price}
                                        </Card.Text>
                                        <Link to={`/products/${product.id}`} element={<ProductDetails />}>
                                            <Button variant="dark"> See Details </Button>
                                        </Link>
                                    </Card.Body>
                                    </Card>             
                                </Col>
                            )}
                        </Row>
                    </Container>
                </>
            ) : (<div> ... loading </div>)
            }
            </body>
        </>
    )
}
