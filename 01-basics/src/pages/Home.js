import React from 'react';
import logo from '../logo.png';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home () {
    return (
      <>
    <div class = "image-container">
    <img src={logo} alt ="my logo"/>
    </div>
    <div class = "header">
    <h1>Welcome to Biz Buddies !</h1>
    <h2>Your Best Business Partner</h2>
    </div>
    <div className = "card-container">
    <div class="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div class="card-img-overlay">
    <h5 class="card-title">Anime Resin Statue</h5>
  </div>
</div>
<div class="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div class="card-img-overlay">
    <h5 class="card-title">Apparels & Accessories</h5>
  </div>
</div>
<div class="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div class="card-img-overlay">
    <h5 class="card-title">Kitchen Appliances</h5>
  </div>
</div>
<div class="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div class="card-img-overlay">
    <h5 class="card-title">Phones</h5>
  </div>
</div>
<div class="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div class="card-img-overlay">
    <h5 class="card-title">Facial Products</h5>
  </div>
</div>
<div class="card text-bg-dark mb-3"> 
  <img src={logo} class="card-img"/>
  <div class="card-img-overlay">
    <h5 class="card-title">Digital Products</h5>
  </div>
</div>
</div>
      </>
)}

