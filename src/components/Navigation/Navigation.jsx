import { NavLink, Outlet } from 'react-router-dom';
import './Navigation.css';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LinkIcon from '@mui/icons-material/Link';
import LinkrNavLogo from '../../assets/logos/linkr-icon-logo.svg'


function Navigation() {
    return (
        <div className='navigation'>
            <nav className="navigation-container">
                <div className="navigation-container1">
                    <img className="linkr-nav-logo" src={LinkrNavLogo} width={50} style={{marginBottom:'20px'}}/>
                    <NavLink to="messages" className="nav-icon">
                        <ChatIcon  
                            style={{ 
                                fontSize: 40, 
                                fill: '#ffffff' 
                            }}
                        />
                    </NavLink>
                    <p className='nav-icon-des'>DMs</p>
                    <NavLink to="channels" className="nav-icon">
                        <GroupsIcon 
                            className="navigation-icon" 
                            style={{ 
                                fontSize: 40, 
                                fill: '#ffffff' 
                            }}
                            sx={{ "&:hover": { color: "blue" } }}
                        />
                    </NavLink>
                    <p className='nav-icon-des'>Channels</p>
                </div>
                <div className="navigation-container2">
                    <NavLink to="login" className="nav-icon">
                        <ExitToAppIcon 
                            className="navigation-icon" 
                            style={{ 
                                fontSize: 40, 
                                fill: '#ffffff'
                            }}
                        />
                    </NavLink>
                    <p className='nav-icon-des'>Logout</p>
                </div>
            </nav>
            
            <Outlet />
            
        </div>
    );
}

export default Navigation;