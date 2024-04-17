import React from 'react';
import './App.css';
import logo from './logo.png'
import Home from './pages/Home'
import paynow from './paynow.jpg';
import alipay from './alipay.jpeg';
import bankTransfer from './bankTransfer.jpg';
import creditCard from './creditCard.jpeg';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid"> 
  <img src={logo} alt="Logo" className="logo" />
    <a class="navbar-brand" href="#">BizBuddies</a> 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About Us</a>
        </li>
      </ul>
      </div>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="Search" placeholder="Product Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
</nav>
    <Home/>
    <h1>Payment</h1> 
<div class = "payment">
  <img src = {paynow}/>
  <img src = {bankTransfer}/>
  <img src = {creditCard}/>
  <img src = {alipay}/>
</div>
<footer>
      <p>© 2024 BizBuddies. All Rights Reserved.</p>
    </footer>
  </>
); 
}

export default App;
