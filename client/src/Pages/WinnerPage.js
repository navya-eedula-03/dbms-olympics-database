import React, { Fragment } from 'react';
import InputCompetes from '../components/Competes/InputCompetes';
import ListCompetes from '../components/Competes/ListCompetes';
import InputEvent from '../components/Event/InputEvent';
import ListEvent from '../components/Event/ListEvent';
import InputWinner from '../components/Winner/InputWinner';
import ListWinner from '../components/Winner/ListWinner';

const WinnerPage = () => {
  return (
      <Fragment>
      
      <div className="container">
      <InputWinner/>
      <ListWinner/>
        </div>
    </Fragment>
  );
};

export default WinnerPage;