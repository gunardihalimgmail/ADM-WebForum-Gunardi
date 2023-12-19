// import './polyfills'
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
// import appHistory from './utils/history';
import ReactNotifications from 'react-notifications-component';
import { Provider } from 'react-redux';
import { store } from './reducers';
import { MyContextProvider } from './mycontext';

if (process.env.NODE_ENV === 'production'){
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
  // <Router history={appHistory}>
  <Provider store={store}>
    {/* <MyContextProvider> */}
      <Router>
          <ReactNotifications />
          <App />
      </Router>
    {/* </MyContextProvider> */}
  </Provider>

  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
