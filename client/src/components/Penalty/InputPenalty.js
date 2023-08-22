import React, { Fragment, useEffect, useState } from "react";


const InputPenalty = () => {

    const [penalty_id, setPenalty_id] = useState("");
    const [player_id, setPlayer_id] = useState("");
    const [event_id, setEvent_id] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");

    const [players, setPlayers] = useState([]);
    const [events, setEvents] = useState([]);


    const getEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/event")
            const jsonData = await response.json()
            console.log(jsonData)
            setEvents(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }


    let eventList = events.length > 0
        && events.map((item, i) => {
            return (
                <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
            )
        }, this);
    
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
    useEffect(() => {

        getPlayer();
        getEvents();

    }, []);


    // setCountry_id=(val)=>{
    //     console.log(val)
    // }

    let playersList = players.length > 0
        && players.map((item, i) => {
            return (
                <option key={item.player_id} value={item.player_id}>{item.player_name}</option>
            )
        }, this);

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("hello")


        console.log("player_id", player_id)
        console.log("event_id", event_id)

        console.log("type", type)



        try {
                const body = { player_id, event_id, year,type};
                console.log(JSON.stringify(body))
                const response = await fetch("http://localhost:5000/penalty", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am a penlaty")
                window.location = "/penalty";
    
            } catch (err) {
                console.log(err.message)
            }

        // e.preventDefault();
        // try {
        //     const body = { event_id, event_name };
        //     console.log(JSON.stringify(body))
        //     const response = await fetch("http://localhost:5000/event", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(body)
        //     });
        //     window.location = "/events";

        // } catch (err) {
        //     console.log(err.message)
        // }

    }
    return (
        <Fragment>
            <h1 className='text-center mt-5'>Input Penalty</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
            <form className="form-inline" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor='player_id'>Player</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setPlayer_id(e.target.value)}>
                        <option>Select..</option>
                            {playersList}

                        </select>

                    </div>
                    <div className="form-group">
                    <label htmlFor='player_id'>Event Name</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                        <option>Select..</option>
                            {eventList}

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
                    <div class="form-group col-md-4">
                        <label for="event_name">Type</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={type}
                            onChange={e => setType(e.target.value)} />
                    </div>
                    

                </div>
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

            {/* 
                                 <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setCountry_id(e.target.value)}>
                        {countriesList}
                            
                                 </select>

                                 </div> */}

            {/* {countries.map(country => (

<option value="select">Select</option>
<option value="Java">Java</option>
<option value="C++">C++</option>
                            ))} */}
            {/* 
        // <tr key={country.country_id}>
        //     <td>{event.event_id}</td>
        //     <td>{event.event_name}</td>
        //     <td><EditEvent event={event}/></td>
        //     <td><button className="btn btn-danger" onClick={()=>deleteEvent(event.event_id)}>Delete</button></td>

        // </tr>))}
                            // <option selected>Choose...</option>
                            // <option>{country_name}</option> */}



            {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setCountry_id(e.target.value)} /> */}

            {/* <div class="form-group">
                    <label for="event_name">Event Name</label>
                    <input type="text"
                        class="form-control"
                        id="country_id"
                        value={event_name}
                        onChange={e => setEvent_name(e.target.value)} />
                </div> */}
            {/* <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd"/>
  </div> */}
            {/* <div class="checkbox">
    <label><input type="checkbox"/> Remember me</label>
  </div> */}


        </Fragment>
    )
}

export default InputPenalty;