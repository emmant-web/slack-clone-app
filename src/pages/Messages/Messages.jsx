import './Messages.css';

function Messages() {
    return (
      <div className="messages">
          <div className="messages-left">
            <h1>Messages</h1>
            <button className='new-message-button'>New Message</button>
          </div>
          <div className="messages-right">
            <h1>Messages</h1>
          </div>
      </div>
    );
}
  
export default Messages;