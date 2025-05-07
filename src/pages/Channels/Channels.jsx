import React, { useEffect, useState } from "react";
import './Channels.css';
import Navigation from '../../components/Navigation/Navigation.jsx';
import CurrentUser from '../../components/CurrentUser/CurrentUser.jsx';
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ChannelChatBox from '../../components/ChannelChatBox/ChannelChatBox.jsx';


function Channels() {
  const { userHeaders } = useData();
  const { getUsers } = useData();
  const { userList } = useData();
  const [channelList, setChannelList] = useState([]);
  const [channelDetails, setChannelDetails] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [newChannelName, setChannelName] = useState();
  const [newChannelMember, setChannelMember] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  // const [userList, setUserList] = useState('')
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedChannelName, setSelectedChannelName] = useState(null);

  
  // SHOW CHANNEL
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
  },[userHeaders])



  // CREATE CHANNEL
 const handleAddChannel = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: newChannelName,
        user_ids: newChannelMember,
      }

      const requestHeaders = {
      headers: userHeaders
      }

      const response = await axios.post(`${API_URL}/channels`, requestBody, requestHeaders);

      const { data } = response;

      if(data.data){
        handleCloseAddDialog();
        getChannels();
        return alert(`${newChannelName} channel is successfully created.`);
      }
    } catch (error) {
        if(error){
          return alert("New channel cannot be created at this time. Please try again later.");
        }
      }
  };
  
  // OPEN DIALOG (CREATE CHANNEL)
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
    getUsers();
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  // MEMBER CHECKBOX (CREATE CHANNEL)
  const handleCheckboxChange = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id) 
        : [...prev, id]                    
    );
    setChannelMember(selectedIds);
  };




  // CHANNEL DETAILS
  const getChannelDetails = async () => {
    try {

      const requestHeaders = {
        headers: userHeaders
      }

      const response = await axios.get(`${API_URL}/channels${selectedChannel}`, requestHeaders);
      const { data } = response;
      setChannelDetails(data.data);
    } catch (error) {
      if(error) {
        return alert("Data not availabe at this time. Try again later");
      }
    }
  }

    // OPEN DIALOG (CHANNEL DETAILS)
    const handleOpenDetailsDialog = async () => {
      setOpenDetailsDialog(true);
      await getChannelDetails();
    };
  
    const handleCloseDetailsDialog = () => {
      setOpenDetailsDialog(false);
    };




  // const getUsers = async () => {
  //   try {
          
  //     const requestHeaders = {
  //       headers: userHeaders
  //     }
          
  //     const response = await axios.get(`${API_URL}/users`, requestHeaders);
  //     const { data } = response;
  //     setUserList(data.data);
  //   } catch (error) {
  //       if(error) {
  //         return alert("Cannot get users");
  //       }
  //   }
  // }
      


  


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
          {/* <img className="nav-logo" src={LinkrLogo} width={130} style={{marginBottom:'20px'}}/> */}
          <h1>Channels</h1>
        </div>

        <div className="channels-left2">
          {
            channelList && 
            channelList.map((group) => {
              return (
                <div 
                  key={group.id} 
                  className="individual-channel" 
                  onClick={() => {setSelectedChannel(group.id); setSelectedChannelName(group.name)}}
                  style={{backgroundColor: selectedChannel === group.id ? "#775279" : "transparent",}}
                >
                  <p>Channel Name: {group.name}</p>
                  <p>Channel ID: {group.id}</p>
                </div>
              )
            })
          }
        </div>

        <div className="channels-left3">
          <button className="create-channel-btn" onClick={handleOpenAddDialog}>+ Create Channel</button>
        </div>

      </div>
    




      <div className="channels-right">

        <div className="channels-right1">
          {selectedChannel ? (<div>
            <h1>{selectedChannelName}</h1>
            <button className="channel-details-btn" onClick={handleOpenDetailsDialog}>Details</button>
            <button>Add Member</button></div>
            ) : (
            <h1>Select a Channel</h1>
          )}

        </div>

        <div className="channels-right2">
          {selectedChannel ? (
            <ChannelChatBox selectedChannel={selectedChannel} selectedChannelName={selectedChannelName} userHeaders={userHeaders} />
            ) : (
            <p>Select a channel.</p>
          )}
        </div>
      </div>
      


      {/* MODAL (CREATE CHANNEL)*/}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Create Channel</DialogTitle>
        <form onSubmit={handleAddChannel}>
          
          <label>Channel Name:</label>
          <input
            type="text"
            className="input-style"
            onChange={(event) => setChannelName(event.target.value)}
            >
          </input>
          <div>
            {userList && userList
              .filter((individual) => individual.id >= 194)
              .map((individual) => {
                const { id, email } = individual;
                return(
                  <div key={id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(id)}
                        onChange={() => handleCheckboxChange(id)}
                      />
                      {email}
                    </label>
                  </div>
                );
              })
            }
          </div>

          <button onClick={() => {handleCloseAddDialog(); setChannelMember([]); setSelectedIds([])}}>Cancel</button>
          <button type='submit' >Add</button>
        </form>
      </Dialog>
      

      {/* MODEL (CHANNEL DETAILS) */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>Create Channel</DialogTitle>
          
          <label>Channel Details</label>
          <div>
            <p>Channel Name: {channelDetails.name}</p>
            <p>Channel ID: {channelDetails.id}</p>
          </div>

          <button onClick={() => {handleCloseDetailsDialog()}}>Close</button>
      </Dialog>

    </div>
  );
};
  
export default Channels;