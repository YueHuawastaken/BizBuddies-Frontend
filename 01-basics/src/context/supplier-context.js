import { createContext, useState, useEffect } from "react";

export const UserContext= createContext();

const SupplierContextData = ({children}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loginState, setLoginState] = useState(false);

    useEffect(()=> {
        const retrieveData = async() => {
            try{
                let defaultPhoneNumber = localStorage.getItem("phoneNumber")? localStorage.getItem("phoneNumber") : '';
                let defaultSupplierId = localStorage.getItem("supplierId")? localStorage.getItem("supplierId") : '';
                let accessToken = localStorage.getItem("accessToken")? localStorage.getItem("accessToken") : '';
                setPhoneNumber(defaultPhoneNumber);
                setSupplierId(defaultSupplierId);
                setAccessToken(accessToken);
            } catch (error) {
                console.error('Error in Phone Number and ID retrieval and token', error)
            }
        }
        retrieveData();
    }, [])

    return(
        <UserContext.Provider value={{phoneNumber, setPhoneNumber, supplierId, setSupplierId, accessToken, setAccessToken, loginState, setLoginState}}>
            {children}
        </UserContext.Provider>
    )
}

export default SupplierContextData;