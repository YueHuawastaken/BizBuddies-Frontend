import React, {useState, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { SearchContext } from '../context/search-context'
import { useNavigate } from 'react-router-dom';

import APIHandler from '../api/apiHandler';

export default function SearchForm(){

    const [productName, setProductName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [studioShopName, setStudioShopName] = useState('');

    const [errorNotification, setErrorNotification] = useState();   

    const {setSearchData} = useContext(SearchContext);

    const navigate = useNavigate();

    const navigateToSearchResult = () => {
        navigate('/search-results')
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const generalRegexPattern = /^[a-zA-Z0-9._ %+\-!@#$&*()]*$/i;
        const numberRegexPattern = /^[0-9]{0,}$/;

        if (productName && !generalRegexPattern.test(productName)){
            setErrorNotification('Invalid product name characters')
        }
        if (studioShopName && !generalRegexPattern.test(studioShopName)){
            setErrorNotification('Invalid studio/shop name characters')
        }
        else if (minPrice && !numberRegexPattern.test(minPrice)){
            setErrorNotification('Invalid price number')
        }
        else if (maxPrice && !numberRegexPattern.test(maxPrice)){
            setErrorNotification('Invalid price number')
        } else {

            const payload = {
                "productName": productName,
                "minPrice": minPrice,
                "maxPrice": maxPrice,
                "studioShopName": studioShopName,
            }
            console.log("frontend req.body here=>", payload)
            
            try {
                let response = await APIHandler.post('/search', payload)
                console.log('fetched data from search engine =>', response.data.products)
                await setSearchData(response.data.products)
                
                navigateToSearchResult()

            } catch(error) {
                console.log('error fetching products', error)
            }

        }
    }

    return(
        <>
            <Container className="mb-4 mt-0 ms-2" style={{flexDirection: 'row', maxWidth:'95%'}}>
                <h5> Search </h5>
                <Form onSubmit={handleSubmit} style={{maxWidth:'250px'}}>
                    <Form.Group className="mb-3" style={{maxWidth: '200px', minWidth:'100px', maxHeight:'40px'}}>
                        <Form.Label style={{fontSize:"10px"}}>Product Name</Form.Label>
                        <Form.Control   type="text" 
                                        style={{fontSize:"10px"}}
                                        placeholder="Search product name"
                                        name="producName"
                                        value={productName}
                                        onChange={(event)=> setProductName(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{maxWidth: '200px', minWidth:'100px', maxHeight:'40px'}}>
                        <Form.Label style={{fontSize:"10px"}}>Studio Shop Name</Form.Label>
                        <Form.Control   type="text" 
                                        style={{fontSize:"10px"}}
                                        placeholder="Search studio/shop name"
                                        name="studioShopName"
                                        value={studioShopName}
                                        onChange={(event)=> setStudioShopName(event.target.value)}
                        />
                    </Form.Group>                      
                    <Form.Group className="mb-3" style={{maxWidth: '200px', minWidth:'200px', maxHeight:'40px'}}>
                        <Form.Label style={{fontSize:"10px"}}>Min Price</Form.Label>
                        <Form.Control   type="text"
                                        placeholder="Enter min price"
                                        style={{fontSize:"10px"}}
                                        name="minPrice"
                                        value={minPrice}
                                        onChange={(event)=>setMinPrice(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={{maxWidth: '200px', minWidth:'200px', maxHeight:'40px'}}>
                        <Form.Label style={{fontSize:"10px"}}>Max Price</Form.Label>
                        <Form.Control   type="text"
                                        placeholder="Enter max price"
                                        style={{fontSize:"10px"}}
                                        name="maxPrice"
                                        value={maxPrice}
                                        onChange={(event)=>setMaxPrice(event.target.value)}
                        />
                    </Form.Group>
                    
                    <Button variant="secondary" className="mb-5 mt-4" type="submit">
                        Submit
                    </Button>
                    
                    <Form.Text className="text-muted mt-3 ms-4 mb-10" style={{color:'red', fontSize:'13px'}}>
                        {errorNotification}
                    </Form.Text>
                </Form>
            </Container>
        </>
    )
}

