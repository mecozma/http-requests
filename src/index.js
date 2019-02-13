import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';



// Defaults

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// Interceptors

axios.interceptors.request.use(request => {
  console.log('Interceptor request',request);
  return request;
}, error => {
  console.log("Interceptor", error);
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  console.log('Interceptor response', response);
  return response;
}, error => {
  return Promise.reject(error);
})

// Removing interceptors
  // var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
  // axios.interceptors.request.eject(myInterceptor);


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
