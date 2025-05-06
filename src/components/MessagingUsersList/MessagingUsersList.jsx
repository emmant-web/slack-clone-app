import { useState, useEffect } from "react";
import { useData } from "../../context/DataProvider";
import axios from 'axios';
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

import "./MessagingUsersList.css"



function MessagingUsersList (){


    const { userHeaders } = useData();
    const navigate = useNavigate();
  


//   for seeing the users
  const [userList, setUserList] = useState([]);


  //   to get the users of the page

  const getUsers = async () => {
    try {
      // axios.get(url, object that has the headers key - value would be the required headers)

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

  useEffect(() => {
    if(userList.length === 0) {
      getUsers();
    }
  })





return(
    <>
    {
  userList &&
  userList
    .filter((individual) => individual.id >= 194)
    .map((individual) => {
      const { id, email } = individual;
      return (
        <div key={id}>
          <p>ID: {id}</p>
          <p>Email: {email}</p>
        </div>
      );
    })
}

    
    </>
)

}

export default MessagingUsersList;