import React, { Fragment, useEffect, useState } from "react";


const InputCompetes = () => {

    const [player_id, setPlayer_id] = useState("");
    // const [player_name, setPlayer_name] = useState("");
    // const [gender, setGender] = useState("");
    // const [age, setAge] = useState("");
    // const [weight, setWeight] = useState("");
    // const [country_id, setCountry_id] = useState("");
    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);

    const [event_id, setEvent_id] = useState("");
    const [year, setYear] = useState("");
    const [score, setScore] = useState("");
    
    



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

    const getPlayers = async () => {
        try {
            const response = await fetch("http://localhost:5000/participant")
            const jsonData = await response.json()
            console.log(jsonData)
            setPlayers(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }

    //calls once
    useEffect(() => {

        getEvents();
        getPlayers();

    }, []);


   
    //Foriegn key references
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



    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("hello")


        console.log("event_id", event_id)
        console.log("player_id", player_id)
        console.log("year", year)


        try {
                const body = { event_id, player_id, year, score };
                console.log("hello",JSON.stringify(body))
                const response = await fetch("http://localhost:5000/competes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am here");
                window.location = "/competes";
    
            } catch (err) {
                console.log(err.message)
            }

    }
    return (
        <Fragment>
            <h1 className='text-center mt-5'>COMPETES</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
            <form className="form-inline" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor='event_id'>Event ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                        <option>Select..</option>
                            {eventList}

                        </select>
                    </div>
                    </div>
                <div className="form-group">
                    <label htmlFor='event_id'>Player ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setPlayer_id(e.target.value)}>
                        <option>Select..</option>
                            {playerList}

                        </select>

                    </div>
                    
                <div class="form-group  col-md-4">
                        <label for="event_name">Year</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={year}
                            onChange={e => setYear(e.target.value)} />
                    </div>

                    <div class="form-group col-md-4">
                        <label for="event_name">Score</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={score}
                            onChange={e => setScore(e.target.value)} />
                    </div>
                    {/* <div class="form-group col-md-4">
                        <label for="event_name">Participant Name</label>
                        <input type="text"
                            class="form-control"
                            id="player_name"
                            value={player_name}
                            onChange={e => setPlayer_name(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Age</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={age}
                            onChange={e => setAge(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Gender</label>
                    <select class="form-control" onChange={e => setGender(e.target.value)}>
                        <option>Choose..</option>
                        <option  value="F">Female</option>
                        <option value="M">Male</option>
                      
                    </select>
                    </div>
                    <div class="form-group">
                        <label for="event_name">Weight</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} />
                    </div>
    */}
                </div> 
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

       
        </Fragment>
    )
}

export default InputCompetes;