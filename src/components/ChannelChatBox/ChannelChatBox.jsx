import './ChannelChatBox.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/Constants';
import ChannelChatBoxInput from '../ChannelChatBoxInput/ChannelChatBoxInput';



function ChannelChatBox({ selectedChannel, userHeaders }) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/messages?receiver_id=${selectedChannel}&receiver_class=Channel`,
        { headers: userHeaders }
      );
      setMessages(res.data.data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };
  


  useEffect(() => {
    if (selectedChannel) {
      fetchMessages();
    }
  }, [selectedChannel]);



  const handleSend = async (newMessage) => {
    try {
      await axios.post(
        `${API_URL}/messages`,
        {
          receiver_id: selectedChannel,
          receiver_class: 'Channel',
          body: newMessage,
        },
        { headers: userHeaders }
      );

      fetchMessages(); // Refresh messages after sending
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };




  return (
    <div className="chat-box">
      <div className="chat-history">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender_id === selectedChannel ? 'incoming' : 'outgoing'
            }`}
          >
            {msg.body}
          </div>
        ))}
      </div>

      <ChannelChatBoxInput onSend={handleSend} />
    </div>
  );
}

export default ChannelChatBox;
