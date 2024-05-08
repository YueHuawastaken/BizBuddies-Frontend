import { createContext, useState, useEffect } from "react";
import { setAuthHeader } from '../api/apiHandler';

export const SupplierContext= createContext();

const SupplierContextData = ({children}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [studioShopName, setStudioShopName] = useState('')
    const [supplier_id, setSupplier_Id] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loginState, setLoginState] = useState(false);

    useEffect(()=> {
        const retrieveData = async() => {
            try{
                let defaultPhoneNumber = localStorage.getItem("phoneNumber")? localStorage.getItem("phoneNumber") : '';
                let defaultSupplierId = localStorage.getItem("supplier_id")? localStorage.getItem("supplier_id") : '';
                let defaultStudioShopName = localStorage.getItem("studioShopName")? localStorage.getItem("studioShopName") : '';
                let accessToken = localStorage.getItem("accessToken")? localStorage.getItem("accessToken") : '';
                let refreshToken = localStorage.getItem("refreshToken")? localStorage.getItem("refreshToken") : '';
                setPhoneNumber(defaultPhoneNumber);
                setSupplier_Id(defaultSupplierId);
                setStudioShopName(defaultStudioShopName)
                setAccessToken(accessToken);
                if(defaultSupplierId !== '')
                {
                    setAuthHeader(accessToken, refreshToken);
                    setLoginState(true);
                }
                    
            } catch (error) {
                console.error('Error in Phone Number and ID retrieval and token', error)
            }
        }
        retrieveData();
    }, [])

    return(
        <SupplierContext.Provider value={{phoneNumber, setPhoneNumber, supplier_id, setSupplier_Id, studioShopName, setStudioShopName,accessToken, setAccessToken, loginState, setLoginState}}>
            {children}
        </SupplierContext.Provider>
    )
}

export default SupplierContextData;