import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { CustomerContext } from '../context/customer-context';
import { Link, useNavigate } from 'react-router-dom';

import APIHandler, { setAuthHeader } from '../api/apiHandler';

export default function CustomerLogin (){

    // context
    const {setUserName} = useContext(CustomerContext);
    const {setCustomer_Id} = useContext(CustomerContext);
    const {setLoginState} = useContext(CustomerContext);

    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorNotification, setErrorNotification] = useState('');

    // navigate
    let navigate = useNavigate();

    function handleGoBack(){
        navigate(-1);   
    }

    // Data
    const handleLoginEmail = (event) => {
        setErrorNotification('');
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setErrorNotification('');
        setPassword(event.target.value);
    }

    const navigateToDashBoard = (customer_id) => {
        navigate(`/customers/dashboard/${customer_id}`)
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const passwordRegexPattern = /^[a-zA-Z0-9._%+\-!@#$&*()]*$/i;

        if (email === "" && password ===""){
            setErrorNotification('Fields cannot empty')
        }
        else if (email === ""){
            setErrorNotification('Email cannot be empty')
        }
        else if (password === ""){
            setErrorNotification('password cannot be empty')
        }
        else if (!emailRegexPattern.test(email)){
            setErrorNotification('invalid email characters or format')
        }
        else if (!passwordRegexPattern.test(password)){
            setErrorNotification('Invalid password')
        }
        else {

            console.log('Login response incoming')

            try {
                console.log('try route hit in login handle submit')

                let loginResponse = await APIHandler.post('/customers/login', {
                    "email": email,
                    "password": password,
                })

                let accessToken = await loginResponse.data.accessToken
                let refreshToken = await loginResponse.data.refreshToken
                
                let ID = await loginResponse.data.customer_id
                let Username = await loginResponse.data.userName

                console.log('access token react =>', accessToken)
                console.log('refresh token react =>', refreshToken)

                setAuthHeader(accessToken, refreshToken)
                setLoginState(true);

                await setCustomer_Id(ID)
                await setUserName(Username)

                localStorage.setItem("customer_id", ID)
                localStorage.setItem("userName", Username)

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
                            <Form.Group className="ms-4 mb-3" controlId="formBasicEmail" style={{maxWidth: '350px', minWidth:'350px'}}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control   type="email" 
                                                placeholder="Enter email"
                                                name="email"
                                                value={email}
                                                onChange={(event) => handleLoginEmail(event)}
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
                                    First time here? <Link to={"/customers/register"}> Register As Customer</Link>
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
    