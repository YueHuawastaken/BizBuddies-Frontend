// import React, {useState, useContext} from 'react';
// import {ProductContext} from '../ProductContext';
// import { useNavigate } from 'react-router-dom';
// import EditProductsForm from './EditProductPage';
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function ListProductPage () {
//     const navigate = useNavigate();
//     const context = useContext(ProductContext);
//     const [formState, setFormState]= useState({
//       'productName': '',
//       'description': '',
//       'versionName': '',
//       'image_url': '',
//       'price': ''
//   })

//   const updateFormField = (e) => {
//     setFormState({
//         ...formState,
//         [e.target.name] : e.target.value
//     })
// }
//     console.log(context);
//     console.log(context.getProducts());

//     return (
//       <>
//       <h1>Your Products</h1>
//       <div className = "card-products">
//       {
//         context.getProducts().map( p => 
//             <div className = "card-body-products">
//                 <h2>{p.productName}</h2>
//                 <p>{p.description}</p>
//                 <p>Version : {p.versionName}</p>
//                 <p>Image : {p.image_url}</p>
//                 <p>Price/SGD : ${p.price}</p>
//                 <button type="button" class="btn btn-success" onClick={() => 
// 	             navigate("/products/edit/"+ p.product_id)}>Edit</button>
                
//                 <button type="button" class="btn btn-danger ms-2" value={p.product_id} onClick={(event) => {
//                     // console.log(p.product_id);
// 	                context.deleteProduct(event.target.value)
//                 }}>Delete</button>
//             </div>
        
//      )
//       }
//       </div>
//       <h1>List New Product</h1>
//         <div className = "productName">
//             <label>Product Name</label>
//             <input type="text" name="productName"
//                     value={formState.productName}
//                     onChange={updateFormField}
//                     className="form-control"
//             />
//         </div>
//         <div className = "description">
//             <label>Description</label>
//             <textarea name="description"
//                     value={formState.description}
//                     onChange={updateFormField}
//                     className="form-control"
//             />
//         </div>
//         <div className = "version">
//             <label>Version</label>
//             <input type="text" name="versionName"
//                     value={formState.versionName}
//                     onChange={updateFormField}
//                     className="form-control"
//             />
//         </div>
//         <div>
//             <label>Upload Image</label>
//             <input type="text" name="image_url"
//                     value={formState.image_url}
//                     onChange={updateFormField}
//                     className="form-control"
//             />
//         </div>
//         <div className = "price">
//             <label>Price/SGD</label>
//             <input type="text" name="price"
//                     value={formState.price}
//                     onChange={updateFormField}
//                     className="form-control"
//             />
//         </div>
//         <button className="btn btn-primary mt-3"
//             onClick={()=>{
//                 context.addProduct(
//                     formState.productName,
//                     formState.description,
//                     formState.versionName,
//                     formState.image_url,
//                     formState.price
//                 );
//                 navigate("/ListProduct");
//             }}
//         >List</button>
//       </>
//     )
// }