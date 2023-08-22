import React, { Fragment, useEffect, useState } from 'react';
import InputAudience from '../components/Audience/InputAudience';
import ListAudience from '../components/Audience/ListAudience';
import InputEvent from '../components/Event/InputEvent';
import ListEvent from '../components/Event/ListEvent';
import MedalCountry from '../components/Medal_Country/MedalCountry';

const AudiencePage = () => {

  const[user,setUser]=useState("");
  const getUser = async () => {
    try {
        const response = await fetch("http://localhost:5000/user")
        const jsonData = await response.json()
        console.log("hello", jsonData[0].current_user)
        setUser(jsonData[0].current_user)
    } catch (err) {
        console.log(err.message)

    }
}
useEffect(() => {

  getUser();
}, []);



  return (
      <Fragment>
      
      <div className="container">
      {(user === 'ioc' || user === 'audience_member') ?                   
    <><InputAudience/></>
                            : ''
                        }
                    

      {/* <InputAudience/> */}
      <ListAudience/>
        </div>
    </Fragment>
  );
};

export default AudiencePage;