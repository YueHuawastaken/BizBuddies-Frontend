import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import { Link, useNavigate } from 'react-router-dom';

import APIHandler from '../api/apiHandler';

export default function Register (){

    // state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [warehouseAddress, setWarehouseAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secret, setSecret] = useState('');

    const [errorNotification, setErrorNotification] = useState('');
    const [successNotification, setSuccessNotification] = useState('');

    // navigate
    let navigate = useNavigate();

    function handleGoBack(){
        navigate(-1);   
    }

    // Data
    const handleRegisterUserName = (event) => {
        setErrorNotification('');
        setUsername(event.target.value);
    }

    const handleRegisterEmail = (event) => {
        setErrorNotification('');
        setEmail(event.target.value);
    }
    const handleRegisterPhoneNumber = (event) => {
        setErrorNotification('');
        setPhoneNumber(event.target.value);
    }
    const handleRegisterWarehouseAddress = (event) => {
        setErrorNotification('');
        setWarehouseAddress(event.target.value);
    }


    const handleRegisterPassword = (event) => {
        setErrorNotification('');
        setPassword(event.target.value);
    }

    const handleRegisterConfirmPassword = (event) => {
        setErrorNotification('');
        setConfirmPassword(event.target.value);
    }

    const handleRegisterSecret = (event) => {
        setErrorNotification('');
        setSecret(event.target.value);
    }

    const navigateToLogin = () => {
        navigate(`/customers/login`)
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const passwordRegexPattern = /^[a-zA-Z0-9._%+\-!@#$&*()]*$/i;
        const phoneNumberRegexPattern =  /^\+\d{7,13}$|^\d{8,14}$/;
        const addressRegexPattern = /^[a-zA-Z0-9\s,'-]*$/;

        if (username === "" && email === "" && phoneNumber === "" && warehouseAddress === "" && password ==="" && confirmPassword ==="" && secret ===""){
            setErrorNotification('Fields cannot empty')
        }
        else if (username === ""){
            setErrorNotification('Username cannot be empty')
        }
        else if (email === ""){
            setErrorNotification('Email cannot be empty')
        }
        else if (phoneNumber === ""){
            setErrorNotification('phoneNumber cannot be empty')
        }
        else if (warehouseAddress === ""){
            setErrorNotification('warehouseAddress cannot be empty')
        }
        else if (password === ""){
            setErrorNotification('password cannot be empty')
        }
        else if (confirmPassword === ""){
            setErrorNotification('password confirmation cannot be empty')
        }
        else if (secret === ""){
            setErrorNotification('secret cannot be empty')
        }
        else if (!emailRegexPattern.test(email)){
            setErrorNotification('invalid email characters or format')
        }
        else if (!phoneNumberRegexPattern.test(phoneNumber)){
            setErrorNotification('invalid phone number characters or format')
        }
        else if (!addressRegexPattern.test(warehouseAddress)){
            setErrorNotification('invalid address characters or format')
        }
        else if (!passwordRegexPattern.test(password)){
            setErrorNotification('Invalid password')
        }
        else if (!passwordRegexPattern.test(confirmPassword)){
            setErrorNotification('Invalid password confirmation')
        }
        else if (!passwordRegexPattern.test(secret)){
            setErrorNotification('Invalid answer')
        }
        else if (password !== confirmPassword){
            setErrorNotification('Passwords do not match')
        }
        else {
            console.log('Register response incoming')

            try {
                console.log('route hit in Register handle submit')

                await APIHandler.post('/customers/register', {
                    "username": username,
                    "email": email,
                    "phoneNumber": phoneNumber,
                    "warehouseAddress": warehouseAddress,
                    "password": password,
                    "secret": secret
                })
                
                setSuccessNotification("Registration success, redirecting...")

                navigateToLogin();
    
            } catch (error) {
                console.log('Unable to register', error)
                setErrorNotification('Registration error, customer exists')
            }
        }
    }


    return (
        <>
            <Container fluid style={{display: 'flex', justifyContent: 'center', maxHeight: "80vh", overflow:'hidden'}}>
                <div className="mb-2" style={{color: 'green'}}>
                    {successNotification}
                </div>
                <Row xs={1} s={1} md={2} lg={2} xl={2} xxl={2} style={{maxHeight:'100%'}}>
                    <Col>
                        <Button variant="secondary" className="ms-4 mb-3" onClick={handleGoBack}> Back </Button>
                        <img    src="/register-page-welcome.jpg" 
                                style={{maxHeight: '85%', maxWidth:'100%', objectFit:'contain'}}
                                className="d-none d-md-block ms-4"        
                                alt="welcome"
                        />
                    </Col>
                    <Col>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="ms-4 mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>User Name</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter username"
                                                name="name"
                                                value={username}
                                                onChange={(event) => handleRegisterUserName(event)}
                                />
                            </Form.Group>
                            <Form.Group className="ms-4 mb-3" controlId="formBasicEmail" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Email</Form.Label>
                                <Form.Control   type="email" 
                                                placeholder="Enter email"
                                                name="email"
                                                value={email}
                                                onChange={(event) => handleRegisterEmail(event)}
                                />
                            </Form.Group> 
                            <Form.Group className="ms-4 mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Phone Number</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter Phone Number"
                                                name="phoneNumber"
                                                value={phoneNumber}
                                                onChange={(event) => handleRegisterPhoneNumber(event)}
                                />
                            </Form.Group>  
                            <Form.Group className="ms-4 mb-3" style={{maxWidth: '500px', minWidth:'350px', maxHeight:'250px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Warehouse Address</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter Warehouse Address"
                                                name="warehouseAddress"
                                                value={warehouseAddress}
                                                onChange={(event) => handleRegisterWarehouseAddress(event)}
                                />
                            </Form.Group>                      
                            <Form.Group className="ms-4 mb-3" controlId="formBasicPassword" style={{maxWidth: '350px', minWidth:'300px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Password</Form.Label>
                                <Form.Control   type="password"
                                                name="password"
                                                placeholder="Password" 
                                                value={password}
                                                onChange={(event) => handleRegisterPassword(event)}
                                />
                            </Form.Group>
                            <Form.Group className="ms-4 mb-3" controlId="formBasicPassword" style={{maxWidth: '350px', minWidth:'300px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Confirm Password</Form.Label>
                                <Form.Control   type="password"
                                                name="password"
                                                placeholder="Confirm Password" 
                                                value={confirmPassword}
                                                onChange={(event) => handleRegisterConfirmPassword(event)}
                                />
                            </Form.Group>
                            <Form.Group className="ms-4 mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>What is the name of your first school?</Form.Label>
                                <Form.Control   type="text"
                                                placeholder="Enter secret"
                                                name="secret"
                                                value={secret}
                                                onChange={(event) => handleRegisterSecret(event)}
                                />
                            </Form.Group>
                            <Form.Group className="ms-4 mb-3">
                                <Form.Text className="text-muted" style={{fontSize:"12px"}}>
                                    Existing user? <Link to="/customers/login"> Login </Link>
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
                </Row>
            </Container>
        </>
        );
}
    