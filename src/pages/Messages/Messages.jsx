import './Messages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/Constants';
import { useData } from '../../context/DataProvider';
import Navigation from '../../components/Navigation/Navigation.jsx';
import CurrentUser from '../../components/CurrentUser/CurrentUser.jsx';
import MessagingUsersList from '../../components/MessagingUsersList/MessagingUsersList.jsx';
import ChatBox from '../../components/ChatBox/ChatBox.jsx';




function Messages() {
  const { userHeaders } = useData();
  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`, {
          headers: userHeaders,
        });
        setUsers(res.data.data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };

    fetchUsers();
  }, [userHeaders]);



  return (
    <div className="messages">
      <div className="messages-user">
        <CurrentUser />
      </div>

      <div className="messages-nav">
        <Navigation />
      </div>

      <div className="messages-left">
        <h1 className="messages-left-title">Messages</h1>
        <MessagingUsersList users={users} onUserSelect={setSelectedUser} />
      </div>

      <div className="messages-right">

        {selectedUser ? (
          <ChatBox selectedUser={selectedUser} userHeaders={userHeaders} />
        ) : (
          <p style={{ padding: '1rem' }}>Select a user to start chatting.</p>
        )}

      </div>
    </div>
  );
}

export default Messages;
