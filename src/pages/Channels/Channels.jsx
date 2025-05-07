import React, { useEffect, useState } from "react";
import './Channels.css';
import Navigation from '../../components/Navigation/Navigation.jsx';
import CurrentUser from '../../components/CurrentUser/CurrentUser.jsx';
import LinkrLogo from '../../assets/logos/linkr-full-logo.svg';
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import { useData } from "../../context/DataProvider";
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, FormControl,   MenuItem, InputLabel, TextField, Select, Box } from '@mui/material'


function Channels() {
  const { userHeaders } = useData();
  const { getUsers } = useData();
  const { userList } = useData();
  const [channelList, setChannelList] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newChannelName, setChannelName] = useState();
  const [newChannelMember, setChannelMember] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  
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
  })


  // ADD CHANNEL
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

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
  
  // SELECT MEMBER ID

      // const getUsers = async () => {
      //     try {
          
      //       const requestHeaders = {
      //         headers: userHeaders
      //       }
      //       const response = await axios.get(`${API_URL}/users`, requestHeaders);
      //       const { data } = response;
      //       setUserList(data.data);
      //     } catch (error) {
      //       if(error) {
      //         return alert("Cannot get users");
      //       }
      //     }
      //   }
      
      //   useEffect(() => {
      //     if(userList.length === 0) {
      //       getUsers();
      //     }
      //   })

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    }
    console.log(selectedIds);
    setChannelMember(selectedIds);
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
          <button className="create-channel-btn" onClick={handleOpenAddDialog}>+ Create Channel</button>
        </div>

      </div>
    
      <div className="channels-right">
          <h1>Channels name will be here</h1>
      </div>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Create Channel</DialogTitle>
        <form onSubmit={handleAddChannel}>
          
          <label>Channel Name:</label>
          <input
            type="number"
            className="input-style"
            onChange={(event) => setChannelName(event.target.value)}
            >
          </input>
          <div>
            {userList && userList
              .filter((individual) => individual.id >= 194)
              .map(individual => (
              <div key={individual.id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={e => handleCheckboxChange(e, individual.id)}
                    checked={selectedIds.includes(individual.id)}
                  />
                  {individual.name}
                </label>
              </div>
            ))}
          </div>

          <button type='submit'>Cancel</button>
          <button onClick={handleAddChannel}>Add</button>
        </form>
      </Dialog>
      

    </div>
  );
};
  
export default Channels;