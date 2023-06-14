import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import './reset.scss'
import App from './components/app/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />    
  </React.StrictMode>
);

