import './CurrentUser.css';
import { useState } from "react";
import { useData } from "../../context/DataProvider"


function CurrentUser() {
    const { userHeaders } = useData();

    return (
        <div className= "current-user">
            <p>Current User: {userHeaders.uid}</p>
        </div>
    )
}

export default CurrentUser;