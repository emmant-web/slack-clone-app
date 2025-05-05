import { useState, createContext, useContext } from "react";

// React Context is a way to manage state globally.
// createContext is a method provided by React's Context API. It facilitates a way to pass data through the component without having to pass props down manually at every level.
const DataContext = createContext();

const DataProvider = ({children}) => {
    const [ userHeaders, setUserHeaders ] = useState('')
    const [ userList, setUserList ] = useState('')

    const handleHeaders = (header) => {
        const updatedHeader = {
            'access-token': header['access-token'],
            uid: header.uid,
            expiry: header.expiry,
            client: header.client,
        }
        setUserHeaders(updatedHeader)
    }

    const handleUser = (user) => {
        const updatedUser = {
            id: user.id,
            email: user.expiry,
        }
        setUserList(updatedUser)
    }
    
    return (
        <DataContext.Provider value={
            {
                handleHeaders,
                userHeaders,
                handleUser,
                userList,
            }
        }>
            {/* children - these are the elements that can use the context */}
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    // useContext - a React Hook that lets you read and subscribe to context from your component.
    return useContext(DataContext);
}

export default DataProvider;