import React, { Fragment, useEffect, useState } from 'react';
import AlertDialog from '../AlertDialog';

const EditPenalty = ({ item }) => {

    const [penalty_id, setPenalty_id] = useState(item.penalty_id);

    const [player_id, setPlayer_id] = useState(item.player_id);
    const [event_id, setEvent_id] = useState(item.event_id);
    const [type, setType] = useState(item.type);
    const [year, setYear] = useState(item.year);

    const [players, setPlayers] = useState([]);
    const [events, setEvents] = useState([]);

    const getPlayer = async () => {
        try {
            const response = await fetch("http://localhost:5000/participant")
            const jsonData = await response.json()
            console.log(jsonData)
            setPlayers(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    const getEvent = async () => {
        try {
            const response = await fetch("http://localhost:5000/event")
            const jsonData = await response.json()
            console.log(jsonData)
            setEvents(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    useEffect(() => {

        getPlayer();
        getEvent();

    }, []);
    function getPlayerName(id) {
        const player=players.filter(p =>p.player_id ===id)
        if(player.length>0){
            console.log("hello",player[0].player_name)
        return player[0].player_name;
        }
        
      
    }
    function getEventName(id) {
        const event=events.filter(c =>c.event_id ===id)
        if(event.length>0){
            console.log(event[0].event_name)
        return event[0].event_name;
        }
        
      
    }

    // setCountry_id=(val)=>{
    //     console.log(val)
    // }

    let playersList = players.length > 0
        && players.map((item, i) => {
            return (
                <option key={item.player_id} value={item.player_id}>{item.player_name}</option>
            )
        }, this);

    let eventsList = events.length > 0
        && events.map((item, i) => {
            return (
                <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
            )
        }, this);

    //edit
    const update = async e => {
        e.preventDefault();

        try {
            console.log("helooo")
            const body = { penalty_id, player_id, event_id,year, type };
            console.log( penalty_id, player_id, event_id,year, type)
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/penalty/${penalty_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(response)
            window.location = "/penalty";
            if(response==='error'){
                <AlertDialog/>
            }

        } catch (err) {
            console.log("helooo noo")

            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${item.penalty_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${item.penalty_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Penalty Info</h4>
                            <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            {/* <form class="form-inline" onSubmit={onSubmitForm}> */}
                            <form class="form-horizontal" >
                                <div class="form-inline">
                                    {/* <div class="form-group">
                    <label for="event_id" class="col text-left"> ID</label>

                    <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} />
                </div>  */}
                                    <div class="form-group  mt-3">
                                        <label for="player_id" class="col text-left">Player</label>

                                        {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} /> */}
                                        <div class="form-group ">
                                            <select id="inputState" class="form-control" onChange={e => setPlayer_id(e.target.value)}>
                                                <option selected value={player_id}>{getPlayerName(player_id)}</option>
                                                {playersList}

                                            </select>

                                        </div>
                                    </div>

                                    <div class="form-group  mt-3">
                                        <label for="event_id" class="col text-left">Event</label>

                                        {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} /> */}
                                        <div class="form-group ">
                                            <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                                                <option selected value={event_id}>{getEventName(event_id)}</option>
                                                {eventsList}

                                            </select>

                                        </div>
                                    </div>

                                    <div class="form-group col-md-4">
                        <label for="event_id">Year</label>
                        <input type="text"
                            class="form-control"
                            id="player_name"
                            value={year}
                            onChange={e => setYear(e.target.value)} />
                    </div>

                                    <div class="form-group  mt-3">
                                        <label for="type">Type</label>
                                        <input type="text"
                                            class="form-control"
                                            id="event_id"
                                            value={type}
                                            onChange={e => setType(e.target.value)} />
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
export default EditPenalty;