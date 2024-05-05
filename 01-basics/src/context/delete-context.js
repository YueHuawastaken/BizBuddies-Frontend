import React, {useState, createContext} from 'react';

export const DeletionContext = createContext();

const DeletionContextData = ({children}) => {

    const [idOfProductForDeletion, setIdOfProductForDeletion] = useState('');

    return (
        <DeletionContext.Provider value={{idOfProductForDeletion, setIdOfProductForDeletion}}>
            {children}
        </DeletionContext.Provider>
    )
}

export default DeletionContextData;