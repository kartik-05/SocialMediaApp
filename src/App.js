import React, { useContext, useEffect } from 'react';

import './App.css';
import Sidebar from './components/Sidebar';
import MidBody from './components/MidBody';
import RightSiderbar from './components/RightSiderbar';
import { UserContext } from './components/contexts/userContext';
import Login from './components/Login';
import FileUploader from './components/FileUploader';


function App() {

  const [user, setUser] = useContext(UserContext);


  return user ? (

    <div className="App">
      <FileUploader />
      <div className="app-container">
        <Sidebar />
        <MidBody />
        <RightSiderbar />
      </div>
    </div>
  ) : (
    <div><Login /></div>
  );
}

export default App;
