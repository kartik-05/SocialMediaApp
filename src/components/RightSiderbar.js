import React, { useContext, useState, useEffect } from 'react'
import './RightSidebar.css'
import Suggestions from './Suggestions';
import { db } from '../firebase';


import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import { UserContext } from './contexts/userContext';
import { ModalContext } from './contexts/ModalContext'



function RightSiderbar() {

    const [user, setUser] = useContext(UserContext);
    const [modal, setModal] = useContext(ModalContext);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {

        const unsubscribe = db.collection('users').onSnapshot(snapshot => {
            setFollowers(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )));
        })

        return () => {
            unsubscribe();
        }
    }, [])





    return (
        <div className="right-sidebar-container">
            <div className="right-sidebar-header">
                <SearchIcon className="rightsidebar-searchicon" style={{ fill: "#686972" }} />
                <input type="text" placeholder='Search' />
                <div className="rightsidebar-notification-icon">
                    <NotificationsActiveIcon style={{ fill: "#3D87DF" }} />
                </div>
            </div>

            <div className="right-sidebar-main">
                <h1>Suggestions For You</h1>
                {
                    followers.map(({ id, data }) => (
                        data.username != user.displayName ? <Suggestions key={id} username={data.username} /> : ''
                    ))
                }
            </div>

            <div className="right-sidebar-footer" onClick={() => { setModal(true) }}>
                Upload New Post<CloudUploadIcon />
            </div>
        </div>
    )
}

export default RightSiderbar
