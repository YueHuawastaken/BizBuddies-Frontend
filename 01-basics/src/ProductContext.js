import React, {useState, createContext} from 'react';

export const ProductContext = createContext ();
export default function ProductContextData(props) {
    const [products, setProducts] = useState ([
        {
            "productName": "Naruto Resin",
            "description": "Description of Naruto Resin",
            "versionName": "Naruto with school uniform",
            "image_url": "Naruto.img",
            "price": "550.00"
          },
          {
            "productName": "Sasuke Resin",
            "description": "Description of Sasuke Resin",
            "versionName": "Sasuke with school uniform",
            "image_url": "Sasuke.img",
            "price": "550.00"
          }
    ]);
    const context = {
        getProducts : () => {
            return products
        },
        addProduct : (productName, description, versionName, image_url, price) => {
                const newProduct = {
                    product_id: Math.floor(Math.random() * 10000 + 1),
                    Product_Name : productName,
                    Description : description,
                    Version_Name : versionName,
                    Image : image_url,
                    Price : price
                }
                const modified = [...products, newProduct];
                setProducts (modified);
        }
    }
    return (
        <ProductContext.Provider value ={context}>
        {props.children}
        </ProductContext.Provider>
    )
}