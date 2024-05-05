import React, {useState, createContext, useMemo} from 'react';

export const ProductContext = createContext();

const ProductContextData = ({children}) => {

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [versionName, setVersionName] = useState('');
    const [price, setPrice] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [image_url, setImage_Url] = useState('');
    const [dateCreated, setDateCreated] = useState('');

    const contextValue = useMemo(()=>{
        return({
            productName, setProductName,
            description, setDescription,
            versionName, setVersionName,
            price, setPrice,
            supplierId, setSupplierId,
            image_url, setImage_Url,
            dateCreated, setDateCreated          
        })
    },  [
            productName, setProductName,
            description, setDescription,
            versionName, setVersionName,
            price, setPrice,
            supplierId, setSupplierId,
            image_url, setImage_Url,
            dateCreated, setDateCreated,          
        ]
    )

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>        
    )
}

export default ProductContextData;