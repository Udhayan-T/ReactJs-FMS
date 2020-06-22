import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Common/routing';
class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
      <Routing/>
      </BrowserRouter>
    )
  }
}

export default App;
