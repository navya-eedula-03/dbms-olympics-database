import React, { Fragment, useEffect, useState } from 'react';

const EditWinner = ({ item }) => {

    const [player_id, setPlayer_id] = useState(item.player_id);
    const [pid,setPid]=useState(item.player_id)
    const [evid,setEvid]=useState(item.event_id)
    const [yearid,setYearid]=useState(item.year)


    const [event_id, setEvent_id] = useState(item.event_id);
    const [medal,setMedal]=useState(item.medal);
    const [year, setYear] = useState(item.year);
    const [country_id, setCountry_id] = useState(item.country_id);
    const [countries, setCountries] = useState([]);
    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);
    const [competes, setCompetes] = useState([]);
    const [winner,setWinner]= useState([]);

    function getEventName(id) {
        const event = events.filter(c => c.event_id === id)
        console.log(typeof (event))
        if (event.length > 0) {
            console.log(event[0].country_name)
            return event[0].event_name;
        }

    }

    function getPlayerName(id) {
        const player = players.filter(c => c.player_id === id)
        console.log(players)
        if (player.length > 0) {
            console.log(player[0].player_name)
            return player[0].player_name;
        }

    }


    const getCountry = async () => {
        try {
            const response = await fetch("http://localhost:5000/country")
            const jsonData = await response.json()
            console.log(jsonData)
            setCountries(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }

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


    const getCompetes = async () => {
        try {
            const response = await fetch("http://localhost:5000/competes")
            const jsonData = await response.json()
            console.log(jsonData)
            setCompetes(jsonData)
        } catch (err) {
            console.log(err.message)

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
    useEffect(() => {

        getParticipants();
        getEvents();
        getCompetes();

    }, []);
    function getCountryName(id) {
        const country = countries.filter(c => c.country_id === id)
        if (country.length > 0) {
            console.log(country[0].country_name)
            return country[0].country_name;
        }


    }

    // setCountry_id=(val)=>{
    //     console.log(val)
    // }

    // let countriesList = countries.length > 0
    //     && countries.map((item, i) => {
    //         return (
    //             <option key={item.country_id} value={item.country_id}>{item.country_name}</option>
    //         )
    //     }, this);

    let eventList = events.length > 0
        && events.map((item, i) => {
            return (
                <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
            )
        }, this);

    let playerList = players.length > 0
        && players.map((item, i) => {
            return (
                <option key={item.player_id} value={item.player_id}>{item.player_name}</option>
            )
        }, this);


    //edit
    const update = async e => {
        e.preventDefault();

        try {
            console.log("helooo")
            const body = { event_id, player_id, year,medal };
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/winner/${evid}/${pid}/${yearid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(response)
            window.location = "/winner";

        } catch (err) {
            console.log("helooo noo")

            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${item.player_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${item.player_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Participant Info</h4>
                            <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            {/* <form class="form-inline" onSubmit={onSubmitForm}> */}
                            <form class="form-horizontal" >
                                <div class="form-inline">
                             
                                    
                                    <div className="form-group">
                                        <label htmlFor='event_id'>Event ID</label>
                                        <div class="form-group col-md-4">
                                            <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                                                <option selected value={event_id}>{getEventName(event_id)}</option>
                                                {eventList}

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor='event_id'>Player ID</label>
                                    <div class="form-group col-md-4">
                                        <select id="inputState" class="form-control" onChange={e => setPlayer_id(e.target.value)}>
                                            <option selected value={player_id}>{getPlayerName(player_id)}</option>
                                            {playerList}

                                        </select>

                                    </div>


                                    <div class="form-group">
                                        <label for="event_name">Year</label>
                                        <input type="text"
                                            class="form-control"
                                            id="country_id"
                                            value={year}
                                            onChange={e => setYear(e.target.value)} />
                                    </div>

                                    <div class="form-group">
                                        <label for="event_name">Medal</label>
                                        <input type="text"
                                            class="form-control"
                                            id="country_id"
                                            value={medal}
                                            onChange={e => setMedal(e.target.value)} />
                                    </div>
                                </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type='submit' className='btn btn-warning' onClick={e => update(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EditWinner;