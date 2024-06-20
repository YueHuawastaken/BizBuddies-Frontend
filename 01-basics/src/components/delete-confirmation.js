import React, {useEffect, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import APIHandler from '../api/apiHandler';

import { useNavigate } from 'react-router-dom';

import { DeletionContext } from '../context/delete-context';
import { SupplierContext } from '../context/supplier-context';
import { DashBoardContext } from '../context/dashboard-context';

export default function DeleteConfirmation () {

    const {idOfProductForDeletion, setIdOfProductForDeletion} = useContext(DeletionContext);
    const {supplier_id, setSupplier_Id} = useContext(SupplierContext);
    const {reRender, setReRender} = useContext(DashBoardContext);
    
    useEffect(()=>{
        if (localStorage.getItem('supplier_id')){
            setSupplier_Id(localStorage.getItem('supplier_id'));
        }
    }, [])

    const navigate = useNavigate();

    const navigateToDashBoard = () => {
        navigate(`/suppliers/dashboard/${supplier_id}`)
    }

    const handleNoButton = () => {
        setIdOfProductForDeletion('')
    }

    const handleDeleteConfirmationButton = () => {
        try {
            APIHandler.post(`/suppliers/${supplier_id}/${idOfProductForDeletion}/delete?supplier_id=${supplier_id}`);
            setIdOfProductForDeletion('')
            console.log('product deleted');
            setReRender(!reRender);
            navigateToDashBoard(supplier_id);

        } catch (error) {
            console.log('failed to delete product', error)
        }
    }

    return(
        <> 
            {idOfProductForDeletion?
            ( 
                <Container className="pt-0 ms-2 mt-0" style={{maxWidth: '350px', marginBottom:'150px', justifySelf:'left'}}>
                    <Card>
                        <Card.Title className="pt-3" style={{fontSize:'16px', textAlign:'center'}}> Do you really want to delete this? </Card.Title>
                        <Card.Body className="d-flex justify-content-center">
                            <Button variant="success" className="btn-sm" onClick={()=>handleNoButton()}> No </Button>
                            <Button variant="danger" className="ms-4 btn-sm" onClick={()=>handleDeleteConfirmationButton(idOfProductForDeletion)}> Yes </Button>
                        </Card.Body>
                    </Card>
                </Container>
            ) : null
            }
        </>
    )
}