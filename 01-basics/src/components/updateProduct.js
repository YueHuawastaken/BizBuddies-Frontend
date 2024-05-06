import React, {useState, useContext, useRef, useEffect } from 'react';
import { SupplierContext } from '../context/supplier-context';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useNavigate, useParams } from 'react-router-dom';

import { CloudinaryContext } from '../context/cloudinary-context';
import { DashBoardContext } from '../context/dashboard-context';

import UploadWidget from './uploadWidget';

import APIHandler from '../api/apiHandler';

export default function UpdateProductForm(){

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');

    const [versionName, setVersionName] = useState('');
    const [price, setPrice] = useState('');

    const {supplier_id, setSupplier_Id} = useContext(SupplierContext);
    const {image_url, setImage_Url, imageUploaded, setImageUploaded} = useContext(CloudinaryContext);
    const {reRender, setReRender} = useContext(DashBoardContext);

    const [singleProductData, setSingleProductData] = useState();

    const [errorNotification, setErrorNotification] = useState('');
    const [successNotification, setSuccessNotification] = useState('');

    const supplierIdRef = useRef(supplier_id);

    const {productId} = useParams();

    const [retrievedProductId, setRetrievedProductId] = useState();

    const navigate = useNavigate();

    function handleGoBack(){
        navigate(-1);
    }

    const retrieveProductById = async (productId) => {
        try{
            console.log('frontend retrieve product by id hit, supplier_id here=>', supplier_id)
            console.log('frontend product params', productId);

            let response = await APIHandler.get(`/suppliers/update/${productId}?supplier_id=${supplier_id || supplierIdRef.current}`);
            console.log('retrieving single product', response.data.product);

            setSingleProductData(response.data.products);
            setProductName(response.data.products.productName);
            setDescription(response.data.products.description);
            setVersionName(response.data.products.versionName);
            setPrice(response.data.products.price);
            setImage_Url(response.data.products.image_url);
            setRetrievedProductId(response.data.products.id);

            setImageUploaded(false);

            console.log('success in loading data')
    
        } catch (error) {
            console.error('error retrieving product data', error)
        }
    }

    useEffect(()=>{
        if (localStorage.getItem('supplier_id')){
            setSupplier_Id(localStorage.getItem('supplier_id'))
        }
        retrieveProductById(productId)
        .catch((error)=>{console.log('fail to set data', error)})

    },[])

    const handleSubmit = async (event) => {

        event.preventDefault();

        const generalRegexPattern = /^[a-zA-Z0-9.,_ %+\-!:?;"'@#$&()\/\s]*$/i;
        const numberRegexPattern = /^[0-9]{0,}$/;

        if (    productName ==='' || 
                description ==='' || 
                versionName ==='' || 
                price ==='' 
                ){
            
                setErrorNotification('Fields cannot be empty');
        }
        else if (productName && !generalRegexPattern.test(productName)){
            setErrorNotification('Invalid product name characters');
        }
        else if (description && !generalRegexPattern.test(description)){
            setErrorNotification('Invalid description characters');
        }
        else if (versionName && !generalRegexPattern.test(versionName)){
            setErrorNotification('Invalid version name characters');
        }
        else if (price && !numberRegexPattern.test(price)){
            setErrorNotification('Invalid price characters');
        }
        else {
            
            setErrorNotification('');
            setSuccessNotification('');

            const payload = {
                "productId": retrievedProductId,
                "productName": productName,
                "description": description,
                "versionName": versionName,
                "price": price,
                "image_url": image_url,
                "supplier_id": supplier_id
            }

            try {
                console.log("frontend supplierIdref here", supplierIdRef.current)
                console.log("frontend payload here", payload);
                await APIHandler.post(`/suppliers/${productId}/update?supplier_id=${supplierIdRef.current}`, payload);
                
                console.log('product updated')
                setSuccessNotification("Product Updated");
                setTimeout(()=>{
                    setReRender(!reRender);
                    handleGoBack()
                }, 1000);
                
            } catch (error) {
                setErrorNotification('Fail to update product');
            }
        }
    }

    return(
        <>
            <Button variant="secondary" className="ms-4 mt-2 mb-3" onClick={handleGoBack}> Back </Button>

            {singleProductData ?
                (<Container className="mb-2 mt-3">
                <h5> Update work </h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                        <Form.Label style={{fontSize:"12px"}}>Product Name</Form.Label>
                        <Form.Control   type="text" 
                                        style={{fontSize:"12px"}}
                                        name="productName"
                                        value={productName? productName : singleProductData.productName}
                                        onChange={(event)=> setProductName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{fontSize:"12px"}}>Description</Form.Label>
                        <Form.Control   as="textarea" 
                                        rows={15}
                                        name="description"
                                        style={{fontSize:"14px"}}
                                        placeholder="description" 
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                        <Form.Label style={{fontSize:"12px"}}>Version Name</Form.Label>
                        <Form.Control   type="text" 
                                        style={{fontSize:"12px"}}
                                        placeholder="Enter product version"
                                        name="versionName"
                                        value={versionName}
                                        onChange={(event)=> setVersionName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                    <Form.Label style={{fontSize:"12px"}}>Price</Form.Label>
                        <Form.Control   type="text"
                                        placeholder="Enter price"
                                        style={{fontSize:"12px"}}
                                        name="price"
                                        value={price}
                                        onChange={(event)=>setPrice(event.target.value)}
                        />
                    </Form.Group> 
                </Form>
                    {imageUploaded && image_url? ( null ):
                               (   <div className="mt-4">
                                        <h6> Existing Picture </h6>
                                        <img src={singleProductData.image_url} alt="placeholder_image" className="oldpic" style={{maxWidth:'500px'}}/>
                                    </div>    
                                )}
                <UploadWidget />
                <Form.Text className="mt-2 ms-2 mb-2" style={{color:'red'}}>
                    {errorNotification}
                </Form.Text>
                <Form.Text className="mt-2 ms-2 mb-2" style={{color:'green'}}>
                    {successNotification}
                </Form.Text>
                <div>
                    <Button variant="secondary" className="mb-5 mt-3" onClick={handleSubmit}>
                            Submit
                    </Button>
                </div>
            </Container>) : (<div className='ms-4'> Loading ... </div>)
            }
        </>
    )
}

