import React, { Fragment } from 'react';
import InputEvent from '../components/Event/InputEvent';
import ListEvent from '../components/Event/ListEvent';
import Login from '../components/Login.js/Login';

const LoginPage = () => {
  return (
      <Fragment>
      
      <div className="container">
      <Login/>
        </div>
    </Fragment>
  );
};

export default LoginPage;