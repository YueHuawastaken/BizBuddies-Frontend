import React, {useEffect, useRef, useState, useContext} from "react";
import APIHandler, {headersData} from "../api/apiHandler";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Cart from "../components/carts";
import CustomerOrders from "../components/customer-orders";

import { Link, useNavigate } from 'react-router-dom';
import { CustomerContext } from "../context/customer-context";
import { DashBoardContext } from "../context/dashboard-context";

export default function Dashboard (){

    const {customer_id, setCustomerId, username, setUsername} = useContext(CustomerContext);
    const {reRender} = useContext(DashBoardContext);

    const [productsData, setProductsData] = useState();
    const [errorNotification, setErrorNotification] = useState();
    const {showItem, setShowItem} = useContext(DashBoardContext);
    const {showProducts, setShowProducts} = useContext(DashBoardContext);
    
    let navigate = useNavigate();

    const usernameRef = useRef();
    const customerIdRef = useRef();

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

    const retrieveCustomerProducts = async () => {

        try {
            let response = await APIHandler.get(`/customers/dashboard/${customer_id}`);
    
            console.log('retrieving products by customers', response.data);
                  
            return response.data.products;
        } catch (error) {
            setErrorNotification('Products not found');
        }
    }

    const reAuth = async () => {
        let accessToken = localStorage.getItem('accessToken');
        headersData["Authorization"] = `Bearer ${accessToken}`
        APIHandler.defaults.headers.common["Authorization"] = headersData["Authorization"]

        await APIHandler.get('/customers/check-login');
        console.log('jwt still in play')
    }

    const handleLogout = () => {
        headersData = {}
        APIHandler.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("customer_id");
        navigate('/')
        console.log('Customer has logged out');
    }

    useEffect(() => {
        console.log('useEffect hit', customer_id, username);

        if (localStorage.getItem('accessToken')){

            console.log('get token')

            try {

                reAuth();
                if (localStorage.getItem("customer_id") && localStorage.getItem("username")){
                    setCustomerId(localStorage.getItem("customer_id"));
                    setUsername(localStorage.getItem("username"));
                }

                if (customer_id && username){
                    usernameRef.current = username;
                    customerIdRef.current = customer_id;
            
                    retrieveCustomerProducts().then((data)=>{
                        console.log('Received data from promise', data);
                        setProductsData(data);
                        if (!productsData){
                            setErrorNotification('Products not found');
                        }
                    }).then(console.log('This is products Data structure', productsData))
                }
            } catch (error) {
                console.log('login again')
                navigate('/customers/login');
            }
        } else {
            navigate('/customers/login');
        }
    },
    [customer_id, username, reRender])

    return (
        <>

            <div style={{display:"flex", justifyContent:"space-between", alignContent:"center"}}>
                <span>
                    <Button variant="dark" className="ms-3 mb-2" onClick={handleGoBack}> Back </Button>
                    <span className="mt-2 ms-4">Welcome: <span style={{color:'slateblue'}}> {username? username : usernameRef.current} </span></span>
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
                                    value="viewCart"
                                    onClick={(event)=>handleToggleButton(event)}
                            > View Cart </Button>                   
                            
                            <Button className="ms-3 mt-1 btn-sm" 
                                    variant="light" 
                                    style={{border:'1px solid black'}}
                                    value="viewOrders"
                                    onClick={(event)=>handleToggleButton(event)}
                            > View Orders </Button>
                        </Col>
                    </Row>
                </Container>
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
                            <customerOrders />
                        </Container>
                    ): (
                        <Container fluid className="ms-3">
                        </Container>
                    )
                }
        </>
    )
}
