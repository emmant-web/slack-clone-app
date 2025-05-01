import { NavLink, Outlet } from 'react-router-dom';
import './Navigation.css';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LinkIcon from '@mui/icons-material/Link';


function Navigation() {
    return (
        <div className='navigation'>
          
            <nav className="navigation-container">
                <div>
                    <LinkIcon 
                        className="navigation-icon" 
                        style={{ 
                            fontSize: 50, 
                            fill: '#ffffff' 
                        }}
                    />
                </div>
                <NavLink to="/">
                    <ChatIcon 
                        className="navigation-icon" 
                        style={{ 
                            fontSize: 50, 
                            fill: '#ffffff' 
                        }}
                    />
                </NavLink>
                <NavLink to="channels">
                    <GroupsIcon 
                        className="navigation-icon" 
                        style={{ 
                            fontSize: 50, 
                            fill: '#ffffff' 
                        }}
                    />
                </NavLink>
                <NavLink to="login" className="logout-icon">
                    <ExitToAppIcon 
                        className="navigation-icon" 
                        style={{ 
                            fontSize: 50, 
                            fill: '#ffffff'
                        }}
                    />
                </NavLink>
            </nav>
            
            <Outlet />
            
        </div>
    );
}

export default Navigation;