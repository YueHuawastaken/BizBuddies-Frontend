import { createContext, useState} from "react";

export const SearchContext= createContext();

const SearchContextData = ({children}) => {

    const [searchData, setSearchData] = useState([]);

    return(
        <SearchContext.Provider value={{searchData, setSearchData}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextData;