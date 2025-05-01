import { NavLink, Outlet } from 'react-router-dom';
import './Navigation.css';
import ChatIcon from '@mui/icons-material/Chat';


function Navigation() {
    return (
        <div className='navigation'>
          
            <nav>
                <div className="item">LOGO</div>
                <NavLink className="item" to="/">Messages</NavLink><br />
                <NavLink className="item" to="channels">Channels</NavLink><br />
                <NavLink className="item" to="login">Logout</NavLink><br />
            </nav>

            <Outlet />
            
        </div>
    );
}

export default Navigation;