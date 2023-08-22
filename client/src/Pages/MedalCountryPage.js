import React, { Fragment } from 'react';
import InputEvent from '../components/Event/InputEvent';
import ListEvent from '../components/Event/ListEvent';
import MedalCountry from '../components/Medal_Country/MedalCountry';

const MedalCountryPage = () => {
  return (
      <Fragment>
      
      <div className="container">
      <MedalCountry/>
        </div>
    </Fragment>
  );
};

export default MedalCountryPage;