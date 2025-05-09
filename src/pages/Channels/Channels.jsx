import { useEffect, useState } from "react";
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
  
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);

  const [newChannelName, setChannelName] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedAddId, setSelectedAddId] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedChannelName, setSelectedChannelName] = useState(null);
  const [memberArrayLength, setMemberArrayLength] = useState(0);

  
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
        user_ids: selectedIds,
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
  };



  // CHANNEL DETAILS
  const getChannelDetails = async () => {
    try {

      const requestHeaders = {
        headers: userHeaders
      }

      const response = await axios.get(`${API_URL}/channels/${selectedChannel}`, requestHeaders);
      const { data } = response;
      setChannelDetails(data.data);
      setMemberArrayLength(data.data["channel_members"].length)
    } catch (error) {
      if(error) {
        return alert("Data not availabe at this time. Try again later");
      }
    }
  }


  // OPEN DIALOG (CHANNEL DETAILS)
  const handleOpenDetailsDialog = () => {
    setOpenDetailsDialog(true);
    getChannelDetails();
    getUsers();
  };
  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
  };


      
  // ADD MEMBER TO THE CHANNEL
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        id: selectedChannel,
        member_id: selectedAddId,
      }

      const requestHeaders = {
      headers: userHeaders
      }

      const response = await axios.post(`${API_URL}/channel/add_member`, requestBody, requestHeaders);

      const { data } = response;

      if(data.data){
        handleCloseMembersDialog();
        return alert("A member is added to the channel.");
        // {userList && userList
        //   .filter((addedMember) => addedMember.id == {selectedAddId});
        //   const addedMemberName = addedMember.email
        //   return alert(`${addedMemberName} is added to the channel.`);
        // }
      }
    } catch (error) {
        if(error){
          return alert("Unable to add new member to the channel. Please try again later.");
        }
      }
  };
  
  // OPEN DIALOG (ADD MEMBER)
  const handleOpenMembersDialog = () => {
    setOpenMembersDialog(true);
    getUsers();
  };

  const handleCloseMembersDialog = () => {
    setOpenMembersDialog(false);
  };

  const handleChangeId = (event) => {
    setSelectedAddId(event.target.value);
  };


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
                  style={{backgroundColor: selectedChannel === group.id ? "#e3f2fd" : "transparent",}}
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
        {selectedChannel ? (
          <div className="channels-rightA">
            <div className="channels-right1">
              <h1>{selectedChannelName}</h1>
              <div>
                <button className="channel-details-btn" onClick={handleOpenDetailsDialog}>Details</button>
                <button className="channel-details-btn" onClick={handleOpenMembersDialog}>Add Member</button>
              </div>
            </div>
            <div className="channels-right2">
                <ChannelChatBox selectedChannel={selectedChannel} selectedChannelName={selectedChannelName} userHeaders={userHeaders} />
            </div>
          </div>
          ) : (
          <div className="channels-rightB">
            <div className="channels-rightB1">
              <p>Select a channel to show messages.</p>
            </div>
          </div>
        )}
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

          <button onClick={() => {handleCloseAddDialog(); setSelectedIds([])}}>Cancel</button>
          <button type='submit' >Add</button>
        </form>
      </Dialog>
      

      {/* MODEL (CHANNEL DETAILS) */}
      <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
        <DialogTitle>CHANNEL DETAILS</DialogTitle>
        <p>Channel Name: {channelDetails.name}</p>
        <p>Channel ID: {channelDetails.id}</p>
        {userList && userList
          .filter((owner) => owner.id === channelDetails.owner_id)
          .map((owner) =>{
            const {email, id} = owner;
            return(
              <div key={id}>
                <p>Channel Owner: {email}</p>
              </div>
            );
          })
        }
        <p>No. of Members: {memberArrayLength}</p>
        <button onClick={() => {handleCloseDetailsDialog()}}>Close</button>
      </Dialog>


      {/* MODAL (ADD MEMBER TO CHANNEL)*/}
      <Dialog open={openMembersDialog} onClose={handleCloseMembersDialog}>
        <DialogTitle>ADD MEMBER TO THE CHANNEL</DialogTitle>
        <form onSubmit={handleAddMember}>
          <div>
            <label></label>
            <select id="item-select" onChange={handleChangeId} value={selectedAddId}>
              <option value="">--Choose a member--</option>
              {userList && userList
                .filter((member) => member.id >= 194)
                .map((member) => (
                <option key={member.id} value={member.id}>
                {member.email}
                </option>
              ))}
            </select>
          </div>

          <button onClick={() => {handleCloseMembersDialog(); setSelectedAddId()}}>Cancel</button>
          <button type='submit' >Add</button>
        </form>
      </Dialog>


    </div>
  );
};
  
export default Channels;