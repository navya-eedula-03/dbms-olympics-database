import React, { Fragment, useEffect, useState } from "react";


const InputHeldAt = () => {
    const [venue_id, setVenue_id] = useState("");
    // const [player_name, setPlayer_name] = useState("");
    // const [gender, setGender] = useState("");
    // const [age, setAge] = useState("");
    // const [weight, setWeight] = useState("");
    // const [country_id, setCountry_id] = useState("");
    const [events, setEvents] = useState([]);
    const [venues, setVenues] = useState([]);

    const [event_id, setEvent_id] = useState("");
    const [date, setDate] = useState("");



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

    const getVenues = async () => {
        try {
            const response = await fetch("http://localhost:5000/venue")
            const jsonData = await response.json()
            console.log(jsonData)
            setVenues(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }

    //calls once
    useEffect(() => {

        getEvents();
        getVenues();

    }, []);


   
    //Foriegn key references
    let eventList = events.length > 0
        && events.map((item, i) => {
            return (
                <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
            )
        }, this);
    
    let venueList = venues.length > 0
        && venues.map((item, i) => {
            return (
                <option key={item.venue_id} value={item.venue_id}>{item.venue_name}</option>
            )
        }, this);



    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("hello")


        console.log("event_id", event_id)
        console.log("venue_id", venue_id)
        console.log("date", date)


        try {
                const body = { event_id, venue_id, date };
                console.log("hello",JSON.stringify(body))
                const response = await fetch("http://localhost:5000/heldAt", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am here");
                window.location = "/heldat";
    
            } catch (err) {
                console.log(err.message)
            }

    }
    return (
        <Fragment>
            <h1 className='text-center mt-5'>HELD AT</h1>
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
                    <label htmlFor='event_id'>Venue ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setVenue_id(e.target.value)}>
                        <option>Select..</option>
                            {venueList}

                        </select>

                    </div>
                    
                <div class="form-group  col-md-4">
                        <label for="date">Date</label>
                        <input type="text"
                            class="form-control"
                            id="date"
                            value={date}
                            onChange={e => setDate(e.target.value)} />
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

export default InputHeldAt;