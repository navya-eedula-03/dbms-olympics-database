import React, { Fragment, useEffect, useState } from "react";


const InputEvent = () => {

    const [event_id, setEvent_id] = useState("");
    const [event_name, setEvent_name] = useState("");
    const [record, setRecord] = useState("");
    const [record_holder_id, setRecordHolder] = useState("");
    const [participants, setParticipants] = useState([]);

    const getParticipants = async () => {
        try {
            const response = await fetch("http://localhost:5000/participant")
            const jsonData = await response.json()
            console.log(jsonData)
            setParticipants(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }

    useEffect(() => {

        getParticipants();
    }, []);

    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { event_name, record,record_holder_id };
            console.log(JSON.stringify(body))
            const response = await fetch("http://localhost:5000/event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location="/events";

        } catch (err) {
            console.log(err.message)
        }



    }

    
    let playerList = participants.length > 0
    && participants.map((item, i) => {
        return (
            <option key={item.player_id} value={item.player_id}>{item.player_name}</option>
        )
    }, this);

    return (
        <Fragment>
            <h1 className='text-center mt-5'>Input Event</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
             <form class="form-inline" onSubmit={onSubmitForm}>
                {/*<div class="form-group">
                    <label for="event_id">Event ID</label>
                    <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} />
                </div> */}
                <div class="form-group">
                    <label for="event_name">Event Name</label>
                    <input type="text"
                        class="form-control"
                        id="event_name"
                        value={event_name}
                        onChange={e => setEvent_name(e.target.value)} />
                </div>
                {/* <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd"/>
  </div> */}
                {/* <div class="checkbox">
    <label><input type="checkbox"/> Remember me</label>
  </div> */}
                 <div class="form-group">
                    <label for="event_id" class="col-md-4 text-left">World Record</label>

                    <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={record}
                        onChange={e => setRecord(e.target.value)} />
                </div> 


                
        <label htmlFor='event_id'>Player</label>
        <div class="form-group col-md-4">
            <select id="inputState" class="form-control" onChange={e =>  setRecordHolder(e.target.value)}>
                <option>Select..</option>
                {playerList}

            </select>

        </div>
                {/* <div class="form-group">
                    <label for="event_id" class="col-md-4 text-left">Record</label>

                    <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setRecordHolder(e.target.value)} />
                </div>  */}
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

        </Fragment>
    )
}

export default InputEvent;