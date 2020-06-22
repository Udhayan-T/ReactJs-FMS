import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.js';
// import 'font-awesome/css/font-awesome.css';
import Axios from 'axios';
import {BrowserRouter} from 'react-router-dom';

Axios.interceptors.request.use(
       config => {
           const token = localStorage.getItem('currentUser');
           console.log(token)
           if (token) {
               config.headers['Authorization'] = 'Bearer '+token;
           }
           config.headers['Access-Control-Allow-Origin']='*';
            config.headers["Access-Control-Allow-Credentials"]=true;
            config.headers['Access-Control-Allow-Methods']='POST, PUT, GET, OPTIONS, DELETE, PATCH';
            config.headers['Access-Control-Allow-Headers']='Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe';
     
           config.headers['Content-Type'] = 'application/json';
           return config;
       },
       error => {
           Promise.reject(error)
       });
   
   
ReactDOM.render( <BrowserRouter><App /></BrowserRouter>,  document.getElementById('root'));

