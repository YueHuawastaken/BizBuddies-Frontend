import '../App.css';

import React, {useState, useEffect, useContext, useRef} from 'react';
import APIHandler from '../api/apiHandler';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import DeleteConfirmation from '../components/delete-confirmation';

import {Link, useParams, useNavigate} from 'react-router-dom';

import { SupplierContext } from '../context/supplier-context';
import { DeletionContext } from '../context/delete-context';

export default function ProductDetailsForDashBoard () {

    const [singleProductData, setSingleProductData] = useState();
    
    const {supplierId, setSupplierId} = useContext(SupplierContext);
    const {idOfProductForDeletion, setIdOfProductForDeletion} = useContext(DeletionContext);

    const {productId} = useParams();
    
    let navigate = useNavigate();

    function handleGoBack(){
        setIdOfProductForDeletion('')
        navigate(-1);   
    }

    const supplierIdRef = useRef(supplierId);

    const retrieveProductById = async (productId) => {
        try{
            let response = await APIHandler.get(`/suppliers/${productId}/products?supplierId=${supplierId || supplierIdRef.current}`);
            console.log('retrieving single product', response.data.product);
            setSingleProductData(response.data.product)
        } catch (error) {
            console.error('error retrieving product data', error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('supplierId')){
            setSupplierId(localStorage.getItem('supplierId'))
        }
        retrieveProductById(productId)}
    ,[])

    return (
        <>
            <Button variant="secondary" className="ms-4 mt-2 mb-3" onClick={handleGoBack}> Back </Button>

            {singleProductData? (
                <>
                <Card   style=  {{    
                                    width: '90%', 
                                    maxWidth:'800px', 
                                    marginBottom: idOfProductForDeletion? '20px':'150px',
                                    marginLeft:'20px',
                                }}
                        className="product-details"
                >
                    <Card.Img   variant="top" src={singleProductData.image_url} 
                                style={{    maxHeight: '350px', 
                                            maxWidth: '800px', 
                                            objectFit:'contain', 
                                            border: '1px solid silver'}}                                            
                    />
                    <Card.Body>
                        
                    <Card.Title>
                        <h5> Product Name: </h5> 
                        {singleProductData.productName} 
                    </Card.Title>
                    <Card.Text> 
                        <span style={{fontWeight:'600'}}>Version Name: </span> {singleProductData.versionName} 
                    </Card.Text>
                    {singleProductData.suppliers? (
                        <Card.Text> 
                            <span style={{fontWeight:'600'}}>Studio/Shop Name: </span> <Link to={`/products/suppliers/${singleProductData.suppliers.id}`} > {singleProductData.suppliers.studioShopName} </Link> 
                        </Card.Text>
                        ) : null
                    }
                    <Card.Text>
                        <h6> Description: </h6>
                        {singleProductData.description}
                    </Card.Text>
                    <Card.Text> 
                        <span style={{fontWeight:'600'}}>Price: </span> {singleProductData.price} 
                    </Card.Text>
                    <Card.Text>
                        <span style={{fontWeight:'600'}}>Date created: </span> {singleProductData.date_created.slice(0,10)} 
                    </Card.Text>
                    <Link to={`/suppliers/${singleProductData.id}/update`} >
                        <Button variant="secondary">Update Item</Button>
                    </ Link>
                    <Button variant="danger" className="ms-3" onClick={()=>setIdOfProductForDeletion(productId)}>Delete Item</Button>
                    </Card.Body>
                </Card>
                <DeleteConfirmation />
            </>
            ) : (
                <div className="ms-4"> Loading... </div>
            )}
        </>
    )
}

