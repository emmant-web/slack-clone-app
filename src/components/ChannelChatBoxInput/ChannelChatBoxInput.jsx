import './ChannelChatBoxInput.css';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

function ChannelChatBoxInput({ onSend }) {
  const [newMessage, setNewMessage] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    onSend(newMessage);
    setNewMessage('');
  };

  



  return (
    <form  onSubmit={handleSubmit}>
      <div className="channel-input-form">
      <div className="channel-input-form1">
        <input
          type="text"
          className="chat-input-for-channel"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </div>
      <div className="channel-input-form2">
        <button 
          type="submit" 
          className='channel-chat-btn'
        > <SendIcon 
          className="navigation-icon" 
          style={{ 
              fontSize: 30, 
              fill: '#ffffff' 
          }}
          sx={{ "&:hover": { color: "blue" } }}
      /></button>
      </div>
      </div>
    </form>
  );
}

export default ChannelChatBoxInput;
