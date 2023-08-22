import React, { Fragment, useEffect, useState  } from 'react';
import InputEvent from '../components/Event/InputEvent';
import ListEvent from '../components/Event/ListEvent';
import InputParticipant from '../components/Participant/InputParticipant';
import ListParticipant from '../components/Participant/ListParticipant';
import ListParticipants from '../components/Participant/ListParticipant';

const ParticipantPage = () => {
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
      {(user === 'ioc' || user=== 'player') ?                   
    <><InputParticipant/></>
                            : ''
                        }
      
      <ListParticipant/>
        </div>
    </Fragment>
  );
};

export default ParticipantPage;