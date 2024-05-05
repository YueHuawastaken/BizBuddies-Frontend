import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";

export default function Footer() {

  return (
    <>
        <footer>
            <Navbar bg="dark" variant="dark" fixed="bottom" style={{height:'30px'}}>
                <Container fluid>
                    <Navbar.Brand style={{fontSize:'14px'}}> &copy; 2024 BizBuddies </Navbar.Brand>
                    <Nav>
                        <Nav.Link className="ml-auto d-none d-sm-flex" style={{color:'white', fontSize:'14px'}}>Team</Nav.Link>
                        <Nav.Link className="ml-auto d-none d-sm-flex" style={{color:'white', fontSize:'14px'}}>Careers</Nav.Link>
                        <Nav.Link className="ml-auto d-none d-sm-flex" style={{color:'white', fontSize:'14px'}}>Blog</Nav.Link>
                        <Nav.Link className="ml-auto d-none d-sm-flex" style={{color:'white', fontSize:'14px'}}>Connect</Nav.Link>
                        <Nav.Link > <img src="/youtube.png" alt="fb" style={{objectFit:'scaledown', height:'20px', marginBottom:'2px'}}/></Nav.Link>
                        <Nav.Link > <img src="/insta.jpg" alt="insta" style={{objectFit:'fill', height:'20px', maxWidth:'20px', marginBottom:'2px'}}/></Nav.Link>
                        <Nav.Link > <img src="/wechat.png" alt="twitter" style={{objectFit:'fill', height:'20px', maxWidth:'20px', marginBottom:'2px'}}/></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </footer>
    </>
  );
}

