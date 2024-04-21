import React, {useContext} from 'react';
import {ProductContext} from '../ProductContext';
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListProductPage () {
    const context = useContext (ProductContext);

    return (
      <>
      <h1>List Product</h1>
      {
        context.getProducts().map( p => <div className = "card">
            <div className = "card-body">
                <h2>{p.productName}</h2>
                <p>{p.description}</p>
                <p>Version : {p.versionName}</p>
                <p>Image : {p.image_url}</p>
                <p>Price/SGD : ${p.price}</p>
            </div>
        </div>
     )
      }
      </>
    )
}