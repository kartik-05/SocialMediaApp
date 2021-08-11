import React, { useState, useContext } from 'react'
import { storage, db } from '../firebase'
import { UserContext } from './contexts/userContext';
import firebase from 'firebase';
import './FileUploader.css'
import { ModalContext } from './contexts/ModalContext';

function FileUploader() {

    const [user, setUser] = useContext(UserContext);
    const [modal, setModal] = useContext(ModalContext);

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handelChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: user.displayName
                        });

                        setProgress(0);
                        setImage(null);
                        setCaption('');
                    });
            }
        );
    };


    return (
        <div className="fileuploader-container" style={modal == false ? { visibility: "hidden" } : { visibility: "visible" }}>
            <div className="fileupload-modal">
                <button className="close-button" onClick={() => { setModal(false) }}>X</button>
                <h1>Upload Post</h1>
                <progress value={progress} max="100" />
                <div className="modal-inputs">
                    <input className="fileupload-caption" type="text" placeholder="Caption" value={caption} onChange={(e) => { setCaption(e.target.value) }} />
                    <input className="fileupload-file" type="file" onChange={handelChange} />

                </div>
                <button className="upload-button" onClick={handleUpload}>Upload</button>

            </div>
        </div>


    )
}

export default FileUploader
