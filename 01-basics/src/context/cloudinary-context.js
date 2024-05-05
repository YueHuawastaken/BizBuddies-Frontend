import React, {useState, createContext} from 'react';

export const CloudinaryContext = createContext();

const CloudinaryContextData = ({children}) => {

    const [image_url, setImage_Url] = useState('');
    const [imageUploaded, setImageUploaded] = useState(false);

    return (
        <CloudinaryContext.Provider value={{image_url, setImage_Url,  imageUploaded, setImageUploaded}}>
            {children}
        </CloudinaryContext.Provider>
    )
}

export default CloudinaryContextData;