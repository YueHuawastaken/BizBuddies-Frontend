import { createContext, useState, useEffect } from "react";

export const CustomerContext= createContext();

const CustomerContextData = ({children}) => {

    const [username, setUsername] = useState('');
    const [customer_id, setCustomerId] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loginState, setLoginState] = useState(false);

    useEffect(()=> {
        const retrieveData = async() => {
            try{
                let defaultUserName = localStorage.getItem("username")? localStorage.getItem("username") : '';
                let defaultCustomerId = localStorage.getItem("customer_id")? localStorage.getItem("customer_id") : '';
                let accessToken = localStorage.getItem("accessToken")? localStorage.getItem("accessToken") : '';
                setUsername(defaultUserName);
                setCustomerId(defaultCustomerId);
                setAccessToken(accessToken);
            } catch (error) {
                console.error('Error in Username and ID retrieval and token', error)
            }
        }
        retrieveData();
    }, [])

    return(
        <CustomerContext.Provider value={{username, setUsername, customer_id, setCustomerId, accessToken, setAccessToken, loginState, setLoginState}}>
            {children}
        </CustomerContext.Provider>
    )
}

export default CustomerContextData;