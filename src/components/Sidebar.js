import React, { useContext, useEffect, useState } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import avatar2 from './images/avatar2.PNG'
import { UserContext } from './contexts/userContext';
import { auth } from '../firebase';

import './Sidebar.css';

function Sidebar() {

    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setUsername(user.displayName);
    }, [user]);

    return (
        <div className="sidebar-section">
            <div className="sidebar-header">
                <div className="profile-image">
                    <img src={avatar2} alt="" />
                </div>
                <h2>{username}</h2>
            </div>
            <div className="sidebar-menu">
                <h2>MENU</h2>
                <ul>

                    <li><div className="sidebar-menu-icons"><HomeIcon /></div><div>Home</div> </li>
                    <li><div className="sidebar-menu-icons"><MessageIcon /> </div><div>Messages</div></li>
                    <li><div className="sidebar-menu-icons"><PersonIcon /></div><div>Profile</div> </li>
                    <li><div className="sidebar-menu-icons"><BookmarkIcon /></div><div>Saved Post</div> </li>
                    <li><div className="sidebar-menu-icons"><SettingsIcon /></div> <div>Settings</div></li>

                </ul>
            </div>

            <div className="sidebar-footer">
                <h2>OTHER</h2>
                <div className="log-out" onClick={() => { auth.signOut(); setUser(null) }}>
                    <div className="sidebar-menu-icons"><ExitToAppIcon /></div>Log Out
                </div>
            </div>
        </div>

    )
}

export default Sidebar
