import './Channels.css';
import Navigation from '../../components/Navigation/Navigation.jsx';
import CurrentUser from '../../components/CurrentUser/CurrentUser.jsx';

function Channels() {
    return (
      <div className="channels">
          <div className="channels-user">
            <CurrentUser />
          </div>
          <div className="channels-nav">
            <Navigation />
          </div>
          <div className="channels-left">
            <h1>Channels</h1>
          </div>
          <div className="channels-right">
            <h1>Channels</h1>
          </div>
      </div>
    );
}
  
export default Channels;