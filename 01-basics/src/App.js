import React from 'react';
import './App.css';
import logo from './logo.png';
import Home from './pages/Home';
import EditProductsForm from './pages/EditProductPage';
import ListProductPage from './pages/ListProductPage';
import Aboutus from './pages/Aboutus'
import ProductContextData from './ProductContext'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (  
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid"> 
      <Link className="navbar-brand" to="/">BizBuddies
      <img src={logo} alt="Logo" className="logo"/></Link> 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="#">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Contact Us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Aboutus">About Us</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="ListProduct">List Products</Link>
        </li>
      </ul>
      </div>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="Search" placeholder="Product Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    </nav>
    <ProductContextData>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/ListProduct" element = {<ListProductPage/>}/>
        <Route path='/products/edit/:productId' element={<EditProductsForm/>}/>
        <Route path='/Aboutus' element={<Aboutus/>}/>
    </Routes>
    </ProductContextData>
    </Router>
); 
}

export default App;
