// import './ChatBoxInput.css';
import { useState } from 'react';

function ChatBoxInput({ onSend }) {
  const [newMessage, setNewMessage] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    onSend(newMessage);
    setNewMessage('');
  };

  



  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      <button type="submit">Send</button>
    </form>
  );
}

export default ChatBoxInput;
