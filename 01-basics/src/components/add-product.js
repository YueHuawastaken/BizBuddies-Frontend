import React, {useState, useContext, useRef, useEffect} from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { CloudinaryContext } from '../context/cloudinary-context';
import { DashBoardContext } from '../context/dashboard-context';
import { SupplierContext } from '../context/supplier-context';

import UploadWidget from './uploadWidget';

import APIHandler from '../api/apiHandler';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AddProductForm(){

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');

    const [versionName, setVersionName] = useState('');
    const [price, setPrice] = useState('');

    const {supplierId, setSupplierId} = useContext(SupplierContext);
    const {image_url} = useContext(CloudinaryContext);

    const [errorNotification, setErrorNotification] = useState('');
    const [successNotification, setSuccessNotification] = useState('');

    const {reRender, setReRender} = useContext(DashBoardContext);
    const {setShowItem} = useContext(DashBoardContext);
    const {setShowProducts} = useContext(DashBoardContext);

    const supplierIdRef = useRef(supplierId);

    useEffect(()=>{
        if (localStorage.getItem('supplierId')){
            setSupplierId(localStorage.getItem('supplierId'))
        }
    },[])

    const navigate = useNavigate();
    
    const navigateToDashBoard = () => {
        navigate(`/suppliers/dashboard/${supplierId}`)
    }

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
                "productName": productName,
                "description": description,
                "versionName": versionName,
                "price": price,
                "image_url": image_url,
                "supplierId": supplierId
            }

            try {
                console.log("frontend supplierIdref here", supplierIdRef.current)
                console.log("frontend payload here", payload);
                await APIHandler.post(`/suppliers/add-product/${supplierIdRef.current}`, payload);

                setSuccessNotification('Success! Product added');
                setTimeout(()=>{
                    setShowItem('');
                    setShowProducts(true);
                    setReRender(!reRender);
                    navigateToDashBoard(supplierId)
                },1000);

            } catch (error) {
                setErrorNotification('Failed to add product');
            }
        }
    }

    return(
        <>
            <Container className="mb-2 mt-3">
                <h5> List a work </h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                        <Form.Label style={{fontSize:"12px"}}>Product Name</Form.Label>
                        <Form.Control   type="text" 
                                        style={{fontSize:"12px"}}
                                        placeholder="Enter product name"
                                        name="productName"
                                        value={productName}
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
                                        placeholder="Enter NIL if there is only one version"
                                        style={{fontSize:"12px"}}
                                        name="price"
                                        value={price}
                                        onChange={(event)=>setPrice(event.target.value)}
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
                                        placeholder="Enter NIL if there is only one version"
                                        style={{fontSize:"12px"}}
                                        name="price"
                                        value={price}
                                        onChange={(event)=>setPrice(event.target.value)}
                        />
                    </Form.Group>                                           
                </Form>
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
            </Container>
        </>
    )
}

