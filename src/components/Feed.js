import React, { useEffect, useState, useContext } from 'react'
import { db } from '../firebase';
import avatar1 from './images/avatar1.PNG'
import './Feed.css'
import { UserContext } from './contexts/userContext';
import firebase from 'firebase';



import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';


function Feed({ postId, username, caption, image }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [user, setUser] = useContext(UserContext);

    const postComment = (e) => {
        e.preventDefault();

        db.collection('posts').doc(postId).collection('comments').add({
            comment: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setComment('');

    }

    useEffect(() => {
        let unsubscribe;

        if (postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        }
    }, [postId])


    return (
        <div className="feed-container">
            <div className="feed-header">
                <div className="feed-user-image">
                    <img src={avatar1} alt="" />
                </div>
                {username}
            </div>
            <div className="feed-image">
                <img src={image} alt="" />
            </div>

            <div className="feed-caption">
                {caption}
            </div>

            <div className="feed-like-and-comments">
                <div className="feed-heart">
                    <FavoriteIcon /> <div>10 Likes</div>
                </div>
                <div className="feed-comment">
                    <CommentIcon /> <div>{comments.length} Comments</div>
                </div>
                <div className="feed-share">
                    <ShareIcon /> <div>17 Share</div>
                </div>
            </div>
            <form action="submit" className="feed-comment-input">
                <input type="text" placeholder="Add a new Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button disabled={!comment} type="submit" onClick={postComment} >s</button>
            </form>
            {
                comments.map((text) => (
                    < div className="feed-comments" >
                        <b>{text.username}</b>{text.comment}
                    </div>
                ))
            }
        </div >
    )
}

export default Feed
