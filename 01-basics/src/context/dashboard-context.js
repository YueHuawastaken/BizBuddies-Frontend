import { createContext, useState} from "react";

export const DashBoardContext= createContext();

const DashBoardContextData = ({children}) => {
    
    const [reRender, setReRender] = useState([]);
    const [showItem, setShowItem] = useState();
    const [showProducts, setShowProducts] = useState(true);

    return(
        <DashBoardContext.Provider value={{reRender, setReRender, showItem, setShowItem, showProducts, setShowProducts}}>
            {children}
        </DashBoardContext.Provider>
    )
}

export default DashBoardContextData;