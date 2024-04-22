import React, { useState, createContext, useEffect, useMemo } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const BASE_API_URL = "https://3000-yuehuawasta-bizbuddiesf-f5u2uhnyabs.ws-us110.gitpod.io";
export default function ProductContextData(props) {

    useEffect (() => {
        const fetchData = async ()  => {
            const response = await axios.get (BASE_API_URL + "/api/products");
            console.log("use effect here, data success?", response.data);
            setProducts(response.data.products);
            console.log("context here", products);
        }
        fetchData ();
    }, []);
    const [products, setProducts] = useState([
        // {
        //     "productId": 1,
        //     "productName": "Naruto Resin",
        //     "description": "Description of Naruto Resin",
        //     "versionName": "Naruto with school uniform",
        //     "image_url": "Naruto.img",
        //     "price": "550.00"
        // },
        // {
        //     "productId": 2,
        //     "productName": "Sasuke Resin",
        //     "description": "Description of Sasuke Resin",
        //     "versionName": "Sasuke with school uniform",
        //     "image_url": "Sasuke.img",
        //     "price": "550.00"
        // }
    ]);


    const context = {
        getProducts: () => {
            console.log("get products", products);
            return products
        },
        addProduct: async (productName, description, versionName, image_url, price) => {
            const response = await axios.post (BASE_API_URL + "/api/products", {
                productName : productName,
                description : description,
                versionName : versionName,
                image_url : image_url,
                price : price 
            })
            const newProduct = {
                productId: response.data.new_product_id,
                productName: productName,
                description: description,
                versionName: versionName,
                image_url: image_url,
                price: price
            }
            const modified = [...products, newProduct];
            setProducts(modified); 
        },
        deleteProduct: async (productId) => {
            let id = productId;
            console.log("front end context product id", productId)
            const response = await axios.delete(BASE_API_URL + `/api/products/` + id);
            if(response.status===200)
            {
                const targetedIndex = products.findIndex(p => p.product_id === parseInt(productId));
                console.log("targetedIndex =", targetedIndex);
                const modifiedProducts = [...products.slice(0, targetedIndex),
                ...products.slice(targetedIndex + 1)];
                setProducts(modifiedProducts) 
            }
        },

            // spread operator is shallow copy of original array

           
        
        getProductByID: (product_id) => {
            const foundProduct = products.filter((p) => p.product_id === parseInt(product_id))
            return foundProduct;
        },
        updateProduct: async (productId, productName, description, versionName, image_url, price) => {
          
       
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

            // console.log("updated product", updatedProduct);
            // const cloneproducts = products.slice();
            // const indexToUpdate = cloneproducts.findIndex((p) => p.product_id===id)
            // cloneproducts.splice(indexToUpdate,1,updatedProduct);
            // setProducts(cloneproducts);
            // setProducts(prevState => {
            //     console.log("productId =>", productId);
            //     console.log("prevState =>", prevState);
            //     const indexToUpdate = prevState.findIndex((p) => p.productId === parseInt(productId));
                
            //     console.log("index to update =>", indexToUpdate);
            //     const modified = [...prevState.slice(0, indexToUpdate), updatedProduct, ...prevState.slice(indexToUpdate+1)]
            //     console.log('modified =>', modified)
            //     return modified;
            // });
            // console.log("After set products =>", products);
            // }
            let response = await axios.put(`${BASE_API_URL}/api/products/${productId}`, updatedProduct);
            if(response.status===200){
                console.log("YAY it works")
            }
        }
    }

    return (
        <ProductContext.Provider value={context}>
            {props.children}
        </ProductContext.Provider>
    )
}