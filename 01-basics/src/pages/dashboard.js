import React, {useEffect, useRef, useState, useContext} from "react";
import APIHandler, {headersData} from "../api/apiHandler";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AddProductForm from "../components/add-product";
import Cart from "../components/carts";
import CustomerOrders from "../components/customer-orders";

import { Link, useNavigate } from 'react-router-dom';
import { SupplierContext } from "../context/supplier-context";
import { DashBoardContext } from "../context/dashboard-context";

export default function Dashboard (){

    const {supplierId, setSupplierId, phoneNumber, setPhoneNumber} = useContext(SupplierContext);
    const {reRender} = useContext(DashBoardContext);

    const [productsData, setProductsData] = useState();
    const [errorNotification, setErrorNotification] = useState();
    const {showItem, setShowItem} = useContext(DashBoardContext);
    const {showProducts, setShowProducts} = useContext(DashBoardContext);
    
    let navigate = useNavigate();

    const phoneNumberRef = useRef();
    const supplierIdRef = useRef();

    const handleToggleButton = (event) => {
        if (showItem === event.target.value) {
            setShowItem('')
            setShowProducts(true)
        } else {
            setShowItem(event.target.value)
            setShowProducts(false)
        }
    }

    const handleShowProductButton = () => {
        setShowItem('');
        setShowProducts(true);
    }

    function handleGoBack(){
        navigate(-1);   
    }

    const retrieveSupplierProducts = async () => {

        try {
            let response = await APIHandler.get(`/suppliers/dashboard/${supplierId}`);
    
            console.log('retrieving products by supplier', response.data);
                  
            return response.data.products;
        } catch (error) {
            setErrorNotification('Products not found');
        }
    }

    const reAuth = async () => {
        let accessToken = localStorage.getItem('accessToken');
        headersData["Authorization"] = `Bearer ${accessToken}`
        APIHandler.defaults.headers.common["Authorization"] = headersData["Authorization"]

        await APIHandler.get('/suppliers/check-login');
        console.log('jwt still in play')
    }

    const handleLogout = () => {
        headersData = {}
        APIHandler.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("supplierId");
        navigate('/')
        console.log('Supplier has logged out');
    }

    useEffect(() => {
        console.log('useEffect hit', supplierId, phoneNumber);

        if (localStorage.getItem('accessToken')){

            console.log('get token')

            try {

                reAuth();
                if (localStorage.getItem("supplierId") && localStorage.getItem("phoneNumber")){
                    setSupplierId(localStorage.getItem("supplierId"));
                    setPhoneNumber(localStorage.getItem("phoneNumber"));
                }

                if (supplierId && phoneNumber){
                  phoneNumberRef.current = phoneNumber;
                  supplierIdRef.current = supplierId;
            
                    retrieveSupplierProducts().then((data)=>{
                        console.log('Received data from promise', data);
                        setProductsData(data);
                        if (!productsData){
                            setErrorNotification('Products not found');
                        }
                    }).then(console.log('This is products Data structure', productsData))
                }
            } catch (error) {
                console.log('login again')
                navigate('/suppliers/login');
            }
        } else {
            navigate('/suppliers/login');
        }
    },
    [supplierId, phoneNumber, reRender])

    return (
        <>

            <div style={{display:"flex", justifyContent:"space-between", alignContent:"center"}}>
                <span>
                    <Button variant="dark" className="ms-3 mb-2" onClick={handleGoBack}> Back </Button>
                    <span className="mt-2 ms-4">Welcome: <span style={{color:'slateblue'}}> {supplierId? supplierId : supplierIdRef.current} </span></span>
                </span>
                <span>
                <Button variant="secondary" className="btn-sm me-4 mt-1" onClick={handleLogout}> Logout</Button>
                </span>
            </div>
            
            <div className="ms-3 mt-1 mb-3" style={{width:'96%', borderBottom:"1px solid black"}}> </div>

            <Container fluid>
                    <Row>
                        <Col style={{maxWidth:'100px'}}>
                            <span className="ms-4" style={{color:'black', fontWeight:'600', fontSize:'20px'}}>Tools</span>
                        </Col>
                        <Col style={{justifyContent:'flex-start'}}>
                            <Button className="ms-3 mt-1 btn-sm" 
                                    variant="light" 
                                    style={{border:'1px solid black'}}
                                    value="addProduct"
                                    onClick={(event)=>handleToggleButton(event)}
                            > List a Work </Button>

                            <Button className="ms-3 mt-1 btn-sm" 
                                    variant="light" 
                                    style={{border:'1px solid black'}}
                                    value="viewCart"
                                    onClick={(event)=>handleToggleButton(event)}
                            > View Cart </Button>                   
                            
                            <Button className="ms-3 mt-1 btn-sm" 
                                    variant="light" 
                                    style={{border:'1px solid black'}}
                                    value="viewOrders"
                                    onClick={(event)=>handleToggleButton(event)}
                            > View Orders </Button>

                            <Button className="ms-3 mt-1 btn-sm" 
                                    variant="light" 
                                    style={{border:'1px solid black'}}
                                    onClick={()=>handleShowProductButton()}
                            > View Your Works </Button>
                        </Col>
                    </Row>
                </Container>
                {
                    showItem === "addProduct"?
                    (
                        <Container fluid className="ms-3">
                            <AddProductForm />
                        </Container>
                    ): (
                        <Container fluid className="ms-3">
                        </Container>
                    )
                }
                {
                    showItem === "viewCart"?
                    (
                        <Container fluid className="ms-3">
                            <Cart />
                        </Container>
                    ): (
                        <Container fluid className="ms-3">
                        </Container>
                    )
                }
                {
                    showItem === "viewOrders"?
                    (   
                        <Container fluid className="ms-3">
                            <CustomerOrders />
                        </Container>
                    ): (
                        <Container fluid className="ms-3">
                        </Container>
                    )
                }
            <div className="ms-3 mt-3 mb-3" style={{width:'96%', borderBottom:"1px solid black"}}> </div>

            <Card className="ms-3" style={{width:'96%', display: showProducts? 'block': 'none'}} id="products-overview">
                <Card.Header as="h5" style={{backgroundColor:'white'}}> Manage Your Works</Card.Header>
                    <Card.Body className="mb-0 pb-0">
                        {productsData?
                            (<Container fluid className="mt-2 mb-5 pb-0">
                                <Row xs={1} s={2} md={2} lg={3} xl={4} xxl={5} style={{justifyContent:'flex-start'}}>
                                    {productsData.map(product => 
                                        <Col style={{marginLeft:'0px'}}>
                                            <Card style={{ width: '18rem', marginTop: '10px', marginBottom:'20px'}}>
                                            <Card.Img variant="top" src={product.image_url} style={{ minHeight: '220px', maxHeight:'220px', objectFit:'contain'}}/>
                                            <Card.Body>
                                                <Card.Title>{product.productName}</Card.Title>
                                                <Card.Text>
                                                {product.description}
                                                </Card.Text>
                                                    <Link to={`/suppliers/${product.id}/products`} >
                                                        <Button variant="dark" className="btn-sm"> Details </Button>
                                                    </Link>
                                            </Card.Body>
                                            </Card>             
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                        ) : (<div className="ms-1 mt-3 mb-4" style={{color:'gray'}}> {errorNotification} </div>)
                        }
                    </Card.Body>
                </Card>
        </>
    )
}
 