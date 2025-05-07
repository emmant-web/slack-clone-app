import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";


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

    const getUsers = async () => {
        try {
        
          const requestHeaders = {
            headers: userHeaders
          }
          const response = await axios.get(`${API_URL}/users`, requestHeaders);
          const { data } = response;
          setUserList(data.data);
        } catch (error) {
          if(error) {
            return alert("Cannot get users");
          }
        }
    }
    
    return (
        <DataContext.Provider value={
            {
                handleHeaders,
                userHeaders,
                getUsers,
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