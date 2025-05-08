import './ChatBox.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/Constants';
import ChatBoxInput from '../ChatBoxInput/ChatBoxInput';



function ChatBox({ selectedUser, userHeaders }) {
  const [messages, setMessages] = useState([]); 

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/messages?receiver_id=${selectedUser.id}&receiver_class=User`,
        { headers: userHeaders }
      );
      setMessages(res.data.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };
  


  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);



  const handleSend = async (newMessage) => {
    try {
      await axios.post(
        `${API_URL}/messages`,
        {
          receiver_id: selectedUser.id,
          receiver_class: 'User',
          body: newMessage,
        },
        { headers: userHeaders }
      );

      fetchMessages(); // Refresh messages after sending
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };




  // return (
  //   <div className="chat-box">
  //     <div className="chat-history">
  //       {messages.map((msg) => (
  //         <div
  //           key={msg.id}
  //           className={`chat-message ${
  //             msg.sender_id === selectedUser.id ? 'incoming' : 'outgoing'
  //           }`}
  //         >
  //           {msg.body}
  //         </div>
  //       ))}
  //     </div>

  //     <ChatBoxInput onSend={handleSend} />
  //   </div>
  // );


  return (
  <div className="chat-box">
    <div className="chat-history">
      {messages.map((msg) => (
        <div key={msg.id} className="chat-message">
          <div className="chat-sender">{msg.sender.email}</div>
          <div className="chat-body">{msg.body}</div>
        </div>
      ))}
    </div>

    <ChatBoxInput onSend={handleSend} />
  </div>
);



  {/* // try daw not to user a strict equality it might be because of that 
            {msg.sender_id}
            {selectedUser.id} //this has the same data as msg.sender this is why both sides are blue */}

  
}

export default ChatBox;
