import './Messages.css';

import { useState } from "react";
import { useData } from "../../context/DataProvider";
import axios from 'axios';
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation.jsx';
import CurrentUser from '../../components/CurrentUser/CurrentUser.jsx';

function Messages() {




  const { userHeaders } = useData();
  const [receiver, setReceiver] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const requestBody = {
              receiver_id: Number(receiver),
              receiver_class: "User",
              body: message
          }

          const requestHeaders = {
              headers: userHeaders
          }

          // axios.post(url, request body, request headers)
          const response = await axios.post(`${API_URL}/messages`, requestBody, requestHeaders);

          const { data } = response;

          if(data.data){
              navigate('/dashboard');
              return alert("Successfully sent a message");
          }
      } catch (error) {
          if(error){
              return alert("Cannot send message");
          }
      }
  };







    return (
      <div className="messages">

        <div className="messages-user">
            <CurrentUser />
        </div>
        <div className="messages-nav">
            <Navigation />
        </div>


          <div className="messages-left">
            <h1>Messages</h1>
            <button className='new-message-button'>New Message</button>
          </div>





          <div className="messages-right">

{/* send message to user */}

<form onSubmit={handleSubmit}>
                <label>Send to:</label>
                <input
                    type="number"
                    className="input-style"
                    placeholder='type ID number of user'
                    onChange={(event) => setReceiver(event.target.value)}
                >
                </input>
                <label>Message:</label>
                <input
                    type="text"
                    className="input-style"
                    onChange={(event) => setMessage(event.target.value)}
                >
                </input>
                <button type='submit'>Send Message</button>
            </form>




          </div>



      </div>
    );
}
  
export default Messages;