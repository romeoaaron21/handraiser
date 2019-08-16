import React, { Component } from 'react';
import './App.css';
import StudentQueue from './components/student-queue/studentQueue';
import Login from './components/super-admin/signIn';
import Admin from './components/super-admin/adminDashboard'
import Main from './main'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Main />
      </React.Fragment>
    );
  }
}

export default App;
