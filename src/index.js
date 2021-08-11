import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './components/contexts/userContext';
import { ModalProvider } from './components/contexts/ModalContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

