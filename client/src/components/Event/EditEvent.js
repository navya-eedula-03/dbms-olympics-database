import React, { Fragment, useEffect, useState } from 'react';

const EditEvent = ({ event }) => {

  const [event_name, setEvent_name] = useState(event.event_name);
  const [event_id, setEvent_id] = useState(event.event_id);
  const [record, setRecord] = useState(event.world_record);
  const [record_holder_id, setRecordHolder] = useState(event.record_holder_id);
  const [players, setPlayers] = useState([]);
  const [participants, setParticipants] = useState([]);





  //edit
  const update = async e => {
    e.preventDefault();

    try {
      console.log("helooo")
      const body = { event_id, event_name, record, record_holder_id };
      
      console.log(JSON.stringify(body))
      const response = await fetch(`http://localhost:5000/event/${event_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)

      });
      console.log(response)
      window.location = "/events";

    } catch (err) {
      console.log("helooo noo")

      console.error(err.message);
    }

  }
  useEffect(() => {

    getParticipants();
    //getEvents();


  }, []);
  function getPlayerName(id) {
    const player = players.filter(c => c.player_id === id)
    console.log(players)
    if (player.length > 0) {
      console.log(player[0].player_name)
      return player[0].player_name;
    }

  }

  const getParticipants = async () => {
    try {
      const response = await fetch("http://localhost:5000/participant")
      const jsonData = await response.json()
      console.log(jsonData)
      setPlayers(jsonData)
    } catch (err) {
      console.log(err.message)

    }
  }
  let playerList = players.length > 0
    && players.map((item, i) => {
      return (
        <option key={item.player_id} value={item.player_id}>{item.player_name}</option>
      )
    }, this);
  return (
    <Fragment>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${event.event_id}`}>
        Edit
      </button>

      <div class="modal" id={`id${event.event_id}`}>
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Edit Event</h4>
              <button type="button" class="close" data-bs-dismiss="modal" onClick={()=>setEvent_name(event.event_name)}>&times;</button>
            </div>

            <div class="modal-body">
              {/* <form class="form-inline" onSubmit={onSubmitForm}> */}
              <form class="form-horizontal" >
                <div class="form-inline">

                  <div class="form-group">
                    <label for="event_name">Event Name</label>
                    <input type="text"
                      class="form-control"
                      id="event_name"
                      value={event_name}
                      onChange={e => setEvent_name(e.target.value)} />
                  </div>
                  <div class="form-group">
                    <label for="event_name">World Record</label>
                    <input type="text"
                      class="form-control"
                      id="event_name"
                      value={record}
                      onChange={e => setRecord(e.target.value)} />
                  </div>
                  <div class="form-group col-md-4">
                    <label for="event_name">Record Holder</label>
                    <select id="inputState" class="form-control" onChange={e => setRecordHolder(e.target.value)}>
                      <option selected value={record_holder_id}>{getPlayerName(record_holder_id)}</option>
                      {playerList}

                    </select>

                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type='submit' className='btn btn-warning ' onClick={e => update(e)}>Edit</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}
export default EditEvent;