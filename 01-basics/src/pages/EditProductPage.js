import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../ProductContext";
import { useNavigate } from 'react-router-dom';

export default function EditProductsForm()
{
    const context = useContext(ProductContext); 
    let navigate = useNavigate();
    const [formState, setFormState] = useState({
        'productName': '',
        'description': '',
        'versionName': '',
        'image_url': '',
        'price': ''
    })

    const {productId} = useParams(); 

    useEffect( ()=> {
        console.log("product id in use effect on edit product page", productId);
        const fetchProducts = () => {
            let tempProduct = context.getProductByID(productId);
            console.log(tempProduct);
            if(tempProduct.length)
                setFormState(...tempProduct);
        }
        fetchProducts()
    }, [])

    


    const updateFormField = (e) => {
        setFormState({
            ...formState,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="centre">
            <h2 className = "edit">Edit Product</h2>
            <div className="product-form">
                <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input type="text" name="productName" className="form-input" onChange={updateFormField} value={formState.productName}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-input height-5" onChange={updateFormField} value={formState.description}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Version Name</label>
                    <input type = "text" name = "versionName" className="form-input" onChange={updateFormField} value={formState.versionName}/>
                    {/* <input type="text" name="brand_id" className="form-input" onChange={updateFormField} value={formState.brand_id}/> */}
                </div>
                <div className="form-group">
                    <label className="form-label">Image_Url</label>
                    <input type="text" name="image_url" className="form-input" onChange={updateFormField} value={formState.image_url}/>
                </div>
                <div className="form-group">
                    <label className="form-label">Price</label>
                    <input type="text" name="price" className="form-input" onChange={updateFormField} value={formState.price}/>
                </div>
                <button className="form-btn" onClick={()=> {
                    context.updateProduct(
                        productId,
                        formState.productName,
                        formState.description,
                        formState.versionName,
                        formState.image_url,
                        formState.price
                    )
                    navigate("/ListProduct")
                }}>Submit</button>
            </div>

        </div>
    )
}
  

    
