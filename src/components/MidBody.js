import React, { useState, useEffect, useContext } from 'react'
import './MidBody.css'
import Following from './Following'
import Feed from './Feed'
import { db } from '../firebase'
import { UserContext } from './contexts/userContext';


function MidBody() {

    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {

        const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    post: doc.data()
                }
            )));
        })

        return () => {
            unsubscribe();
        }
    }, [])

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

        <div className="mid-body-container">
            <div className="mid-body-header">
                {
                    followers.map(({ id, data }) => (
                        data.username != user.displayName ? <Following key={id} username={data.username} /> : ''
                    ))
                }
            </div>
            <div className="mid-body-feed">
                <div className="feeds-info">
                    Feeds
                </div>
                <div className="feeds">
                    {
                        posts.map(({ id, post }) => (
                            <Feed key={id} username={post.username} postId={id} image={post.imageUrl} caption={post.caption} />
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default MidBody
