import React, { useEffect, useState } from "react";
import './Channels.css';
import Navigation from '../../components/Navigation/Navigation.jsx';
import CurrentUser from '../../components/CurrentUser/CurrentUser.jsx';
import LinkrLogo from '../../assets/logos/linkr-full-logo.svg';
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";

function Channels() {
  const { userHeaders } = useData();
  const [channelList, setChannelList] = useState([]);

  const getChannels = async () => {
    try {

      const requestHeaders = {
        headers: userHeaders
      }

      const response = await axios.get(`${API_URL}/channels`, requestHeaders);
      const { data } = response;
      setChannelList(data.data);
    } catch (error) {
      if(error) {
        return alert("No channels available.");
      }
    }
  }

  useEffect(() => {
    if(channelList.length === 0) {
      getChannels();
    }
  })

  return (
    <div className="channels">
        <div className="channels-user">
          <CurrentUser />
        </div>
        <div className="channels-nav">
          <Navigation />
        </div>
        <div className="channels-left">
          <div className="channels-left1">
            <img className="nav-logo" src={LinkrLogo} width={130} style={{marginBottom:'20px'}}/>
            <h1>Channels</h1>
          </div>





          <div className="channels-left2">
            {
              channelList && 
              channelList.map((group) => {
                const { name, id } = group;
                return (
                  <div key={id} className="individual-channel">
                    <p>Channel Name: {name}</p>
                    <p>Channel ID: {id}</p>
                  </div>
                )
              })
            }
          </div>






          <div className="channels-left3">
            <button className="create-channel-btn">+ Create Channel</button>
          </div>


        </div>
        <div className="channels-right">
          <h1>Channels name will be here</h1>
        </div>
    </div>
  );
}
  
export default Channels;