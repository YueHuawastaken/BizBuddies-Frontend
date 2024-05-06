import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { SupplierContext } from '../context/supplier-context';
import { Link, useNavigate } from 'react-router-dom';

import APIHandler, { setAuthHeader } from '../api/apiHandler';

export default function SupplierLogin (){

    // context
    const {setStudioShopName} = useContext(SupplierContext);
    const {setSupplier_Id} = useContext(SupplierContext);
    const {setLoginState} = useContext(SupplierContext);
    const {setPhoneNumber} = useContext(SupplierContext)
    // state
    const [phoneNumberForm, setPhoneNumberForm] = useState('');
    const [password, setPassword] = useState('');

    const [errorNotification, setErrorNotification] = useState('');

    // navigate
    let navigate = useNavigate();

    function handleGoBack(){
        navigate(-1);   
    }

    // Data
    const handleLoginPhoneNumber = (event) => {
        setErrorNotification('');
        setPhoneNumberForm(event.target.value);
    }

    const handlePassword = (event) => {
        setErrorNotification('');
        setPassword(event.target.value);
    }

    const navigateToDashBoard = (supplier_id) => {
        navigate(`/suppliers/dashboard/${supplier_id}`)
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const phoneNumberRegexPattern =  /^\+\d{7,13}$|^\d{8,14}$/;
        const passwordRegexPattern = /^[a-zA-Z0-9._%+\-!@#$&*()]*$/i;

        if (phoneNumberForm === "" && password ===""){
            setErrorNotification('Fields cannot empty')
        }
        else if (phoneNumberForm === ""){
            setErrorNotification('Phone Number cannot be empty')
        }
        else if (password === ""){
            setErrorNotification('password cannot be empty')
        }
        else if (!phoneNumberRegexPattern.test(phoneNumberForm)){
            setErrorNotification('invalid email characters or format')
        }
        else if (!passwordRegexPattern.test(password)){
            setErrorNotification('Invalid password')
        }
        else {

            console.log('Login response incoming')

            try {
                console.log('try route hit in login handle submit')

                let loginResponse = await APIHandler.post('/suppliers/login', {
                    "phoneNumber": phoneNumberForm,
                    "password": password,
                })
                console.log(loginResponse.data)
                let accessToken = await loginResponse.data.accessToken
                let refreshToken = await loginResponse.data.refreshToken
                
                let ID = await loginResponse.data.supplier_id
                let studioShopName = await loginResponse.data.studioShopName
                let phoneNumber = await loginResponse.data.phoneNumber

                console.log('access token react =>', accessToken)
                console.log('refresh token react =>', refreshToken)

                setAuthHeader(accessToken, refreshToken)
                setLoginState(true);
                console.log(ID);
                console.log(studioShopName);

                await setSupplier_Id(ID)
                await setStudioShopName(studioShopName)
                await setPhoneNumber (phoneNumber)

                localStorage.setItem("supplier_id", ID)
                localStorage.setItem("studioShopName", studioShopName)
                localStorage.setItem("phoneNumber", phoneNumber)

                if (ID){
                    navigateToDashBoard(ID);
                }
            } catch (error) {
                console.log('Invalid login', error)
                setErrorNotification('Invalid Log in')
            }
        }
    }

    return (
        <>
            <Container fluid style={{display: 'flex', justifyContent: 'center', maxHeight: "80vh", overflow:'hidden'}}>
                <Row xs={1} s={1} md={2} lg={2} xl={2} xxl={2} style={{maxHeight:'100%'}}>
                    <Col>
                        <Button variant="secondary" className="ms-4 mt-2 mb-3" onClick={handleGoBack}> Back </Button>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="ms-4 mb-3"  style={{maxWidth: '350px', minWidth:'350px'}}>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter Phone Number"
                                                name="phoneNumber"
                                                value={phoneNumberForm}
                                                onChange={(event) => handleLoginPhoneNumber(event)}
                                />
                            </Form.Group>                    
                            <Form.Group className="ms-4 mb-3" controlId="formBasicPassword" style={{maxWidth: '350px', minWidth:'300px'}}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control   type="password"
                                                name="password"
                                                placeholder="Password" 
                                                value={password}
                                                onChange={(event) => handlePassword(event)}
                                />
                            </Form.Group>
                            <Form.Group className="ms-4 mb-3">
                                <Form.Text className="text-muted">
                                    First time here? <Link to={"/suppliers/register"}> Register </Link>
                                </Form.Text>
                            </Form.Group>
                            
                            {/* <input type="hidden" name="_csrf" value={csrfToken} /> */}
                            <Button variant="secondary" className="ms-4" type="submit">
                                Submit
                            </Button>
                            <Form.Text className="text-muted mt-3 ms-4">
                                {errorNotification}
                            </Form.Text>
                        </Form>
                    </Col>
                    <Col>
                        <img    src="/login-page-welcome.jpg" 
                                style={{maxHeight: '100%', maxWidth:'100%', objectFit:'fill'}}
                                className="d-none d-md-block"
                                alt="welcome"
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
    