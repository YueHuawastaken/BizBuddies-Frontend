import React, {useState, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { SearchContext } from '../context/search-context'
import { useNavigate } from 'react-router-dom';

import APIHandler from '../api/apiHandler';

export default function SearchForm(){

    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [postCategoryId, setPostCategoryId] = useState('');
    const [genreId, setGenreId] = useState([]);

    const [errorNotification, setErrorNotification] = useState();   

    const {setSearchData} = useContext(SearchContext);

    const navigate = useNavigate();

    const navigateToSearchResult = () => {
        navigate('/search-results')
    }

    const handleGenreChange = (event) => {
        const { value, checked } = event.target;
        
        if (checked) {
            if (genreId.length > 0){
                setGenreId([...genreId, value])
            } else {
                setGenreId([value])
            }
        } else {

            let genreArray = genreId.filter((genreId) => genreId !== value)
            setGenreId(genreArray);
        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const generalRegexPattern = /^[a-zA-Z0-9._ %+\-!@#$&*()]*$/i;
        const numberRegexPattern = /^[0-9]{0,}$/;

        if (name && !generalRegexPattern.test(name)){
            setErrorNotification('Invalid title characters')
        }
        else if (minPrice && !numberRegexPattern.test(minPrice)){
            setErrorNotification('Invalid price number')
        }
        else if (maxPrice && !numberRegexPattern.test(maxPrice)){
            setErrorNotification('Invalid price number')
        } else {

            const payload = {
                "name": name,
                "minPrice": minPrice,
                "maxPrice": maxPrice,
                "postCategoryId": postCategoryId,
                "genreId": genreId.map(stringId => parseInt(stringId))
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
                        <Form.Label style={{fontSize:"10px"}}>Title Name</Form.Label>
                        <Form.Control   type="text" 
                                        style={{fontSize:"10px"}}
                                        placeholder="Search title name"
                                        name="name"
                                        value={name}
                                        onChange={(event)=> setName(event.target.value)}
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
                    <Form.Group>
                        <Form.Label style={{fontSize:"10px"}}>Work Category</Form.Label>
                        <Form.Select    aria-label="Work Category"
                                        name="postCategoryId"
                                        value={postCategoryId}
                                        onChange={(event)=>setPostCategoryId(event.target.value)}
                                        style={{maxWidth: '176px', minWidth:'176px', maxHeight:'35px', fontSize: '12px'}}
                        >
                            <option style={{fontSize:"10px"}}>Select Category of Work</option>
                            <option value="1">Free</option>
                            <option value="2">Webnovel</option>
                            <option value="3">Published</option>
                            <option value="4">Manuscript</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{fontSize:"10px"}}>Genres</Form.Label>
                        <div style={{display:"flex", flexWrap:"wrap", maxWidth:"95%"}}>
                            <Form.Check
                                    type="checkbox"
                                    label="fantasy"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="fantasy"
                                    value="1"
                                    checked={genreId.includes("1")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="drama"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="drama"
                                    value="2"
                                    checked={genreId.includes("2")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="romance"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="romance"
                                    value="3"
                                    checked={genreId.includes("3")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="comedy"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="comedy"
                                    value="4"
                                    checked={genreId.includes("4")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="animal"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="animal"
                                    value="5"
                                    checked={genreId.includes("5")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="selfhelp"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="selfhelp"
                                    value="6"
                                    checked={genreId.includes("6")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="business"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="business"
                                    value="7"
                                    checked={genreId.includes("7")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="biography"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="biography"
                                    value="8"
                                    checked={genreId.includes("8")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="art"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="art"
                                    value="9"
                                    checked={genreId.includes("9")}
                                    onChange={handleGenreChange}
                            />
                            <Form.Check
                                    type="checkbox"
                                    label="coding"
                                    style={{fontSize:"12px", marginRight:'5px'}}
                                    name="coding"
                                    value="10"
                                    checked={genreId.includes("10")}
                                    onChange={handleGenreChange}
                            />
                        </div>
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

