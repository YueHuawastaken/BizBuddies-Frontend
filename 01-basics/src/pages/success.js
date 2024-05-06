import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/esm/Container';
import '../App.css';

export default function SuccessPage(){

useEffect(()=>{
    setTimeout(()=> {
        const element = document.querySelector('.circle-loader');
        element.classList.add('load-complete');
        document.querySelector('.checkmark').style.display = 'block';
    }, 1200)
}, [])

return(
    <>
        <Container fluid style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div
            className="modal show"
            style={{ display: 'block', position: 'initial'}}
            >
            <Modal.Dialog>
                <Modal.Header style={{display:'flex', justifyContent:'center'}}>
                <Modal.Title>Payment Successful</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:'0px', marginBottom:'0px'}}>
                <div className="circle-loader" style={{alignSelf:'center', padding:'0px', marginBottom:'20px'}}>
                    <div className="checkmark draw">
                    </div>
                </div>
                </Modal.Body>
                
                <Modal.Footer style={{display:'flex', justifyContent:'flex-start'}}>
                    <p>Thank You For The Purchase! You may find your items in your inbox!</p>
                    <p>You may now close this tab.</p>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
        </Container>
    </>
)
}