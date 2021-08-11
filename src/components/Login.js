import React, { useState, useContext, useEffect } from 'react'
import illus from './images/illus.png'
import './Login.css'
import { UserContext } from './contexts/userContext';
import { db, auth } from '../firebase';

function Login() {

    const [signin, setSignin] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const changeToSignIn = () => {
        setSignin(!signin);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            }
            else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user])


    const signUp = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                db.collection("users").add({
                    username: username,
                    email: email
                });

                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));
    }

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((signedUser) => {
                setUser(signedUser);
                console.log(signedUser);
            })
            .catch((error) => {
                alert(error.message);
            })
    }

    return (
        <div className="login-container">

            <div className="login-text">

                {!signin ? (
                    <>
                        <form action="submit">
                            <h1 className="login-input">Sign Up</h1>
                            <h5 className="login-input">Sign up with Email</h5>
                            <div className="login-username login-input"><div>Username*</div> <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                            <div className="login-email login-input"><div>Email*</div> <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                            <div className="login-password login-input"><div>Password*</div> <input type="password" placeholder="Min. 6 character" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                            <button onClick={signUp}>Sign Up</button>
                        </form>
                        <div className="sign-in-check">Already have an Account? <button onClick={changeToSignIn}>Sign In</button></div>
                    </>
                ) :
                    (
                        <>
                            <form action="submit">
                                <h1 className="login-input">Sign in</h1>
                                <h5 className="login-input">Sign in with Email</h5>
                                <div className="login-email login-input"><div>Email*</div> <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                <div className="login-password login-input"><div>Password*</div> <input type="password" placeholder="Min. 6 character" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                                <button onClick={signIn}>Sign In</button>
                            </form>
                            <div className="sign-in-check">Create One? <button onClick={changeToSignIn}>Sign Up</button></div>

                        </>
                    )
                }


            </div>

            <div className="login-image">
                <img src={illus} alt="" />
            </div>
        </div>

    )
}

export default Login
