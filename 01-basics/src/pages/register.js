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
    const [studioShopName, setStudioShopName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [zhiFuVerification, setZhiFuVerification] = useState('');
    const [wxId, setWxId] = useState('');
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
    const handleRegisterStudioShopName = (event) => {
        setErrorNotification('');
        setStudioShopName(event.target.value);
    }

    const handleRegisterPhoneNumber = (event) => {
        setErrorNotification('');
        setPhoneNumber(event.target.value);
    }
    const handleRegisterZhiFuVerification = (event) => {
        setErrorNotification('');
        setZhiFuVerification(event.target.value);
    }
    const handleRegisterWxId = (event) => {
        setErrorNotification('');
        setWxId(event.target.value);
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
        navigate(`/suppliers/login`)
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        const phoneNumberRegexPattern =  /^\+\d{7,13}$|^\d{8,14}$/;
        const passwordRegexPattern = /^[a-zA-Z0-9._%+\-!@#$&*()]*$/i;

        if (studioShopName === "" && phoneNumber === "" && zhiFuVerification === "" && wxId === "" && password ==="" && confirmPassword ==="" && secret ===""){
            setErrorNotification('Fields cannot empty')
        }
        else if (studioShopName === ""){
            setErrorNotification('Studio/Shop Name cannot be empty')
        }
        else if (phoneNumber === ""){
            setErrorNotification('Phone Number cannot be empty')
        }
        else if (zhiFuVerification === ""){
            setErrorNotification('ZhiFuVerification cannot be empty')
        }
        else if (wxId === ""){
            setErrorNotification('Wei Xing ID cannot be empty')
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
        else if (!phoneNumberRegexPattern.test(phoneNumber)){
            setErrorNotification('invalid phone number characters or format')
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

                await APIHandler.post('/suppliers/register', {
                    "studioShopName": studioShopName,
                    "phoneNumber": phoneNumber,
                    "zhiFuVerification" : zhiFuVerification,
                    "wxId" : wxId,
                    "password": password,
                    "secret": secret
                })
                
                setSuccessNotification("Registration success, redirecting...")

                navigateToLogin();
    
            } catch (error) {
                console.log('Unable to register', error)
                setErrorNotification('Registration error, supplier exists')
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
                                <Form.Label style={{fontSize:"12px"}}>Studio Shop Name</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter Studio Shop Name"
                                                name="studioShopName"
                                                value={studioShopName}
                                                onChange={(event) => handleRegisterStudioShopName(event)}
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
                            <Form.Group className="ms-4 mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Zhi Fu Verification</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter Zhi Fu Verification"
                                                name="zhiFuVerification"
                                                value={zhiFuVerification}
                                                onChange={(event) => handleRegisterZhiFuVerification(event)}
                                />
                            </Form.Group>
                            <Form.Group className="ms-4 mb-3" style={{maxWidth: '350px', minWidth:'350px', maxHeight:'60px'}}>
                                <Form.Label style={{fontSize:"12px"}}>Wei Xing ID</Form.Label>
                                <Form.Control   type="text" 
                                                placeholder="Enter WXID"
                                                name="wxId"
                                                value={wxId}
                                                onChange={(event) => handleRegisterWxId(event)}
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
                                    Existing user? <Link to="/suppliers/login"> Login </Link>
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
    