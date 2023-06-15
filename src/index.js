import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { Auth0Provider } from '@auth0/auth0-react';
import './index.scss';
import './reset.scss'
import App from './components/app/App';
import store from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />  
    </Provider>
      
  </React.StrictMode>
);

