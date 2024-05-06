import { createContext, useState, useEffect } from "react";

export const CustomerContext= createContext();

const CustomerContextData = ({children}) => {

    const [userName, setUserName] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loginState, setLoginState] = useState(false);

    useEffect(()=> {
        const retrieveData = async() => {
            try{
                let defaultUserName = localStorage.getItem("userName")? localStorage.getItem("userName") : '';
                let defaultCustomerId = localStorage.getItem("customerId")? localStorage.getItem("customerId") : '';
                let accessToken = localStorage.getItem("accessToken")? localStorage.getItem("accessToken") : '';
                setUserName(defaultUserName);
                setCustomerId(defaultCustomerId);
                setAccessToken(accessToken);
            } catch (error) {
                console.error('Error in Username and ID retrieval and token', error)
            }
        }
        retrieveData();
    }, [])

    return(
        <CustomerContext.Provider value={{userName, setUserName, customerId, setCustomerId, accessToken, setAccessToken, loginState, setLoginState}}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerContextData;