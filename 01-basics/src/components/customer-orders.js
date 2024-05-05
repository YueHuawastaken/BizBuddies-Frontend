import React, {useEffect, useState} from 'react';
import APIHandler from '../api/apiHandler';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export default function CustomerOrders(){

    let customerId;
    let allFetchedOrders;
    let orderGroup;
    let ordersArray;

    const [fetchedOrders, setFetchedOrders] = useState('');
    const [ordersGroup, setOrdersGroup] = useState('');

    const fetchPaidOrders = async () => {
        console.log('frontend fetch paid orders hit')
        let response = await APIHandler.get(`/orders?customerId=${customerId}`);
        allFetchedOrders = response.data.customerOrders;
        console.log('front end allFetchedOrders here', allFetchedOrders)
        return allFetchedOrders;
    }

    const orderGrouping = (orders) => {
    
        orderGroup = {}

        for (let order of orders){
            const orderId = order.order_id
            if (!orderGroup[orderId]) {
                orderGroup[orderId] = [];
            }
            orderGroup[orderId].push(order);
        }

        console.log("order grouping here", orderGroup)

        ordersArray = [];

        for (let key of Object.keys(orderGroup)) {
            ordersArray.push({key: orderGroup[key]});
        }

        console.log('orders array here', ordersArray)

    }

    useEffect(()=>{
        if(localStorage.getItem('customerId')){
            console.log('setting customerId hit')
            customerId = localStorage.getItem('customerId');
        }
        fetchPaidOrders().then((orders) => {
            setFetchedOrders(orders)
            orderGrouping(orders)
        }).then(()=>{
            setOrdersGroup(ordersArray)
        })
    },[])

    return (
        <>
                <Card className="ms-2 mt-4 mb-4" style={{width:'96%', display:'flex'}}>
                    <Card.Header as="h5" 
                                style={{backgroundColor:'magenta', color: 'white', display:'flex', justifyContent:'space-between', alignItems:'center'}}
                    >
                        Order History
                    </Card.Header>
                    <Card.Body className="mb-0 pb-0 ms-0 ps-0 pe-0 me-0" style={{width:'96%'}}>
                        {ordersGroup?
                            (ordersGroup.map(order => 
                                <Container fluid style={{display:'flex', justifyContent: 'center', width:'100%', margin:'20px', padding:'0px'}}>
                                    <Card style={{width:'96%', marginBottom: '20px'}}>
                                        <Card.Header as="h6" style={{display:'flex', justifyContent:'space-between'}}>
                                            Order Id: {order.key[0].order_id} <span>Date: {order.key[0].date_time.slice(0,10)}</span>
                                        </Card.Header>
                                        <Card.Body fluid style={{backgroundColor:'white'}}>
                                            <Row xs={2} s={3} md={4} lg={5} xl={6} xxl={7} style={{justifyContent:'flex-start'}}>
                                                {order.key.map(item => (
                                                    <Col>
                                                        <Card style={{maxwidth:'12rem'}}>
                                                            <Card.Header style={{fontWeight:'600', fontSize:'14px', backgroundColor:'cyan'}}>
                                                            Product Id: {item.product_id}
                                                            </Card.Header>
                                                            <Card.Body style={{fontSize:'12px'}}>
                                                                Product Name: {item.product_name} <br />
                                                                Price: {item.price} <br />
                                                                Quantity: {item.quantity}
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )
                                                )}
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Container>
                            )) : (<div> No orders found </div>)
                        }
                    </Card.Body>
                </Card>
        </>
    )
}