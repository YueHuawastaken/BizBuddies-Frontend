import '../App.css';

import React, {useState, useEffect, useContext} from 'react';
import APIHandler, {headersData} from '../api/apiHandler';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {Link, useParams, useNavigate} from 'react-router-dom';
import { CustomerContext } from '../context/customer-context';
import { CartContext } from '../context/cart-context';

export default function ProductDetails () {

    const [singleProductData, setSingleProductData] = useState(null);
    const [addToCartNotification, setAddToCartNotification] = useState('');
    const [cartErrorNotification, setCartErrorNotification] = useState('');

    let singleProductPadding;

    const {customerId, setCustomerId} = useContext(CustomerContext);
    const {cartNumber, setCartNumber} = useContext(CartContext);

    const retrieveProductById = async (productId) => {
        try{
            let response = await APIHandler.get(`/products/${productId}`);
            console.log('retrieving single product', response.data.product);
            singleProductPadding = response.data.product;
            console.log('singleProductPadding here =>', singleProductPadding)
            return singleProductPadding;
        } catch (error) {
            console.error('error retrieving product data', error)
        }
    }

    const {productId} = useParams();
    
    let navigate = useNavigate();

    function handleGoBack(){
        navigate(-1);
    }

    let cartNumberInTransit;

    const getCartNumber = async () => {
        try {
            console.log('frontend get cart number hit')
            let response = await APIHandler.get('/carts/assign-cart-number')
            console.log('after fetch cart number, response here=>', response.data.cartNumber)
            setCartNumber(response.data.cartNumber);
            cartNumberInTransit = response.data.cartNumber;

        } catch (error) {
            console.log('fail to get cart number', error)
            return;
        }
    }

    const handleLoginStateForCart = async () => {

        setCartErrorNotification('');
        setAddToCartNotification('');
        document.querySelector('#cart-add-notify').style.display = 'none'
        document.querySelector('#error-notify').style.display = 'none'

        try {

            if (localStorage.getItem('accessToken')){
                let accessToken = localStorage.getItem('accessToken');
                headersData["Authorization"] = `Bearer ${accessToken}`
                APIHandler.defaults.headers.common["Authorization"] = headersData["Authorization"]
            }

            await APIHandler.get('/customers/check-login');
            console.log('checked customerlogin')

            if (localStorage.getItem('customerId')){
                setCustomerId(localStorage.getItem('customerId'))
                console.log('set customerId from local storage')
            }
            
            try {

                if(cartNumber===''){
                    console.log('frontend start get cart number');
                    await getCartNumber()
                }

                try{
                    const payload = {
                        "customer_id": customerId,
                        "cart_id": cartNumber? cartNumber : cartNumberInTransit,
                        "product_id": parseInt(productId),
                        "product_name": singleProductData.productName,
                        "price": singleProductData.price,
                        "image_url": singleProductData.image_url
                    }
    
                    console.log('cart payload', payload);
    
                    await APIHandler.post(`carts/${productId}/add?customerId=${customerId}`, payload)
    
                    console.log('posted to cart')
    
                    setAddToCartNotification("One Item added to cart!");

                    document.querySelector('#cart-add-notify').style.display = 'flex'

                } catch (error){
                    console.log("error adding item to cart");
                    setCartErrorNotification("Error adding item to cart");
                    document.querySelector('#error-notify').style.display = 'flex'
                }

            } catch (error){
                console.log('fail to get cart Number')
                setCartErrorNotification("Error adding item to cart");
                document.querySelector('#error-notify').style.display = 'flex'
            }
        } catch (error){
            console.log('login to add cart')
            navigate('/customers/login/addCart');
        }
    }

    useEffect(() => {
            retrieveProductById(productId).then((data) => {
                setSingleProductData(data);
            })
    }
    ,[])


    return (
        <>
            <Button variant="secondary" className="ms-4 mt-2 mb-3" onClick={handleGoBack}> Back </Button>
            
            {singleProductData? <>
            {singleProductData.map((productversion) => 
                (
                    <>
                <Card   style=  {{
                                    width: '90%',
                                    maxWidth:'800px',
                                    justifyContent:'space-evenly',
                                    marginBottom:'30px',
                                    marginLeft:'20px',
                                }}
                        className="product-details"
                >
                    <Card.Img   variant="top" src={productversion.image_url} 
                                style={{    maxHeight: '350px', 
                                            maxWidth: '800px', 
                                            objectFit:'contain', 
                                            border: '1px solid silver'}}                                            
                    />
                    <Card.Body>                        
                    <Card.Title>
                        <h5> Product Name: </h5> 
                        {productversion.products.productName || productversion.products.productName} 
                    </Card.Title>
                    <Card.Text>
                        <h5> Description: </h5>
                        {productversion.products.description || productversion.products.description}
                    </Card.Text>
                    <Card.Text> 
                        <span style={{fontWeight:'600'}}>Version Name: </span> {productversion.versionName || productversion.versionName} 
                    </Card.Text>
                    <Card.Text> 
                        <span style={{fontWeight:'600'}}>Price: </span> {productversion.price || productversion.price} 
                    </Card.Text>
                    {/* <Card.Text>
                        <span style={{fontWeight:'600'}}>Date created: </span> {singleProductData.date_created.slice(0,10) || singleProductPadding.date_created.slice(0,10)} 
                    </Card.Text> */}
                    
                    <Button variant="success" onClick={()=>handleLoginStateForCart()}>Add to Cart</Button>
                    </Card.Body>
                </Card>
                </>
                )
            )}
            </>
             : (
                <div className="ms-4"> Loading... </div>
            )}

            <div id='cart-add-notify' style={{      backgroundColor:'green', 
                                                    color:'white',
                                                    height:'30px',
                                                    display:'none',
                                                    justifyContent:'center',
                                                    alignItems:'center',
                                                    marginBottom:'50px',
                                                    marginTop:'0px'
                                                }}
            >
            {addToCartNotification}
            </div>
            <div id='error-notify' style={{         backgroundColor:'red', 
                                                    color:'white',
                                                    height:'30px',
                                                    display:'none',
                                                    justifyContent:'center',
                                                    alignItems:'center',
                                                    marginBottom:'50px',
                                                    marginTop: '0px'
            }}
            > {cartErrorNotification}</div>
            <div style={{height:'80px'}}>
            </div>
        </>
    )
}

