import React from 'react';
import logo from '../logo.png';
import paynow from '../paynow.jpg';
import alipay from '../alipay.jpeg';
import bankTransfer from '../bankTransfer.jpg';
import creditCard from '../creditCard.jpeg';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home () {
    return (
      <>
    <div className = "image-container">
    <img src={logo} alt ="my logo"/>
    </div>
    <div className = "header">
    <h1>Welcome to Biz Buddies !</h1>
    <h2>Your Best Business Partner</h2>
    </div>
    <div className = "card-container">
    <div className="card text-bg-dark mb-3"> 
  <img src={logo} className="card-img"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Anime Resin Statue</h5>
  </div>
</div>
<div className="card text-bg-dark mb-3"> 
  <img src={logo} className="card-img"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Apparels & Accessories</h5>
  </div>
</div>
<div className="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Kitchen Appliances</h5>
  </div>
</div>
<div className="card text-bg-dark mb-3"> 
  <img src={logo} className="card-img"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Phones</h5>
  </div>
</div>
<div className="card text-bg-dark mb-3"> 
  <img src={logo} className="card-img"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Facial Products</h5>
  </div>
</div>
<div className="card text-bg-dark mb-3"> 
  <img src={logo} className="card-img"/>
  <div className="card-img-overlay">
    <h5 className="card-title">Digital Products</h5>
  </div>
</div>
</div>
<h1>Payment</h1> 
<div className = "payment">
  <img src = {paynow}/>
  <img src = {bankTransfer}/>
  <img src = {creditCard}/>
  <img src = {alipay}/>
</div>
<footer>
      <p>© 2024 BizBuddies. All Rights Reserved.</p>
    </footer>
      </>
)}

