import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();
export default function ProductContextData(props) {
    const [products, setProducts] = useState([
        {
            "productId": 1,
            "productName": "Naruto Resin",
            "description": "Description of Naruto Resin",
            "versionName": "Naruto with school uniform",
            "image_url": "Naruto.img",
            "price": "550.00"
        },
        {
            "productId": 2,
            "productName": "Sasuke Resin",
            "description": "Description of Sasuke Resin",
            "versionName": "Sasuke with school uniform",
            "image_url": "Sasuke.img",
            "price": "550.00"
        }
    ]);


    const context = {
        getProducts: () => {
            console.log(products)
            return products
        },
        addProduct: (productName, description, versionName, image_url, price) => {
            const newProduct = {
                productId: Math.floor(Math.random() * 10000 + 1),
                productName: productName,
                description: description,
                versionName: versionName,
                image_url: image_url,
                price: price
            }
            const modified = [...products, newProduct];
            setProducts(modified);
        },
        deleteProduct: (productId) => {
            const targetedIndex = products.findIndex(p => p.productId === parseInt(productId));
            console.log("targetedIndex =", targetedIndex);
            const modifiedProducts = [...products.slice(0, targetedIndex),
            ...products.slice(targetedIndex + 1)];

            // spread operator is shallow copy of original array

            setProducts(modifiedProducts)
        },
        getProductByID: (productId) => {
            const foundProduct = products.filter((p) => p.productId === parseInt(productId))
            return foundProduct;
        },
        updateProduct: (productId, productName, description, versionName, image_url, price) => {
          
       
            // const response =  {
            //     productName : productName,
            //     description : description,
            //     versionName: versionName,
            //     image_url: image_url,
            //     price: price,
            // };
            // if(response.status === 202)
            // {
            const updatedProduct = {
                productId: parseInt(productId),
                productName: productName,
                description: description,
                versionName: versionName,
                image_url: image_url,
                price: price,
            }
            // const cloneproducts = products.slice();
            // const indexToUpdate = cloneproducts.findIndex((p) => p.product_id===id)
            // cloneproducts.splice(indexToUpdate,1,updatedProduct);
            // setProducts(cloneproducts);
            setProducts(prevState => {
                console.log("productId =>", productId);
                console.log("prevState =>", prevState);
                const indexToUpdate = prevState.findIndex((p) => p.productId === parseInt(productId));
                
                //      const indexToUpdate = prevState.findIndex((p) => {
                //     // console.log("p =>", p);
                //     return p.productId === parseInt(productId)
                // });

                
                console.log("index to update =>", indexToUpdate);
                const modified = [...prevState.slice(0, indexToUpdate), updatedProduct, ...prevState.slice(indexToUpdate+1)]
                console.log('modified =>', modified)
                return modified;
            });
            console.log("After set products =>", products);
            // }
        }
    }

    return (
        <ProductContext.Provider value={context}>
            {props.children}
        </ProductContext.Provider>
    )
}