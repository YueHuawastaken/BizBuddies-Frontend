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

    const [exproductName, setexProductName] = useState('');
    const [productsData, setProductsData] = useState();

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');

    const [versionName, setVersionName] = useState('');
    const [price, setPrice] = useState('');

    const {supplier_id, setSupplier_Id} = useContext(SupplierContext);
    const {image_url} = useContext(CloudinaryContext);

    const [errorNotification, setErrorNotification] = useState('');
    const [successNotification, setSuccessNotification] = useState('');

    const {reRender, setReRender} = useContext(DashBoardContext);
    const {setShowItem} = useContext(DashBoardContext);
    const {setShowProducts} = useContext(DashBoardContext);

    const supplierIdRef = useRef(supplier_id);

    const getproductinfo = (product_id) => {
        console.log(productsData)
        const foundproduct =  productsData.find((p) => p.id === parseInt(product_id));
        console.log(foundproduct)
        return foundproduct;
    }

    const retrieveSupplierProducts = async () => {

        try {
            console.log("retrieveSupplierProducts")
            let response = await APIHandler.get(`/suppliers/getproductsname/${supplier_id}`);
    
            console.log('retrieving products by supplier', response.data);
                  
            return response.data.products;
        } catch (error) {
            console.log(error);
            setErrorNotification('Products not found');
        }
    }

    useEffect(()=>{
        if (localStorage.getItem('supplier_id')){
            setSupplier_Id(localStorage.getItem('supplier_id'))
        }
        if (supplier_id){
            supplierIdRef.current = supplier_id;
              retrieveSupplierProducts().then((data)=>{
                  console.log('Received data from promise', data);
                  setProductsData(data);
                  
              }).then(console.log('This is products Data structure', productsData))
          }
    },[])

    const navigate = useNavigate();
    
    const navigateToDashBoard = () => {
        navigate(`/suppliers/dashboard/${supplier_id}`)
    }

    const handleSelect = (event) => {
        setexProductName(event.target.value)
        if(event.target.value == "new")
        {
            setProductName("")
            setDescription("")
        }
        else
        {
            if(event.target.value)
            {
                const productinfo = getproductinfo(event.target.value)
                console.log(productinfo)
                setProductName(productinfo.productName)
                setDescription(productinfo.description)
            }
            else
            {
                setProductName("")
                setDescription("")
            }
        }
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
                "supplier_id": supplier_id
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
                    navigateToDashBoard(supplier_id)
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
                    <Form.Group className="mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'90px'}}>
                        <Form.Label style={{fontSize:"12px"}}>Product Name</Form.Label>
                        <Form.Select aria-label="Default select example"
                                        style={{fontSize:"12px"}}
                                        name="exproductName"
                                        value={exproductName}
                                        onChange={handleSelect}
                        >
                            <option >Select Extisting Product</option>
                            {productsData?
                            <>
                            {productsData.map((product) => {
                                return (
                                <option value={product.id} key={product.id}>
                                    {product.productName}
                                </option>
                                );
                            })}
                            </>
                            :
                            <p>Loading</p>}
                            <option value={"new"}>New Product</option>
                        </Form.Select>
                        <Form.Control   type="text" 
                                        style={{fontSize:"12px"}}
                                        placeholder="Enter product name"
                                        name="productName"
                                        value={productName}
                                        onChange={(event)=> setProductName(event.target.value)}
                                        disabled={exproductName !== 'new'} 
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
                                        disabled={exproductName !== 'new'} 
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

