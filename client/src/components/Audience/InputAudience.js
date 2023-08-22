import React, { Fragment, useEffect, useState } from "react";


const InputAudience = () => {

    const [audience_id, setAudience_id] = useState("");
    const [person_name, setPerson] = useState("");
    const [ticket_price, setTicketPrice] = useState("");
    const [event_name, setEventName] = useState("");

    
    
    const [venue_id, setVenue_id] = useState("");
    const [venues, setVenues] = useState([]);
    const [events, setEvents] = useState([]);

    const [event_id, setEvent_id] = useState("");
    const [dates, setDates] = useState([]);
    const [date, setDate] = useState("");




    const getEvents = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/venueevent/${id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setEvents(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    const getDates = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/dates/${venue_id}/${id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setDates(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    const getVenue = async () => {
        try {
            const response = await fetch("http://localhost:5000/venue")
            const jsonData = await response.json()
            console.log(jsonData)
            setVenues(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    useEffect(() => {

        getVenue();


    }, []);

    let eventList = events.length > 0
    && events.map((item, i) => {
        return (
            <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
        )
    }, this);
    // setVenue_id=(val)=>{
    //     console.log(val)
    // }

    let venuesList = venues.length > 0
        && venues.map((item, i) => {
            return (
                <option key={item.venue_id} value={item.venue_id}>{item.venue_name}</option>
            )
        }, this);

        let dateList = dates.length > 0
        && dates.map((item, i) => {
            console.log(item.date)
           let dt=new Date(item.date).toLocaleDateString({ timeZone: 'UTC' })
           console.log(dt)
           let month=dt.substring(0,2)
           let date1=dt.substring(2,5)
           let year=dt.substring(5,9)
           let newdate=date1+month+year
            console.log(newdate)

            return (
                <option key={newdate} value={newdate}>{newdate}</option>
            )
        }, this);


    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("hello")


        console.log("venue_id", venue_id)
        // console.log("experience", experience)

        // console.log("score", score)


        try {
                const body = { venue_id,person_name,ticket_price,event_id,date };
                console.log(JSON.stringify(body))
                const response = await fetch("http://localhost:5000/audience", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am a audience")
                window.location = "/audience";
    
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
            <h1 className='text-center mt-5'>Input Audience</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
            <form className="form-inline" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor='venue_id'>Venue Name</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => {setVenue_id(e.target.value);getEvents(e.target.value)}}>
                        <option>Select..</option>
                            {venuesList}

                        </select>

                    </div>
                    <div className="form-group">
                    <label htmlFor='venue_id'>Event Name</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => {setEvent_id(e.target.value);getDates(e.target.value)}}>
                        <option>Select..</option>
                            {eventList}

                        </select>
</div>
                    </div>
                    <div className="form-group">
                    <label htmlFor='venue_id'>Date</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => {setDate(e.target.value)}}>
                        <option>Select..</option>
                            {dateList}

                        </select>
                        </div>

                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Person Name</label>
                        <input type="text"
                            class="form-control"
                            id="person_name"
                            value={person_name}
                            onChange={e => setPerson(e.target.value)} />
                    </div>

                    <div class="form-group col-md-4">
                        <label for="event_name">Ticket Price</label>
                    <select class="form-control" onChange={e => setTicketPrice(e.target.value)}>
                        <option>Choose..</option>
                        <option  value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="1500">1500</option>
                        <option value="2000">2000</option>
                        <option value="3000">3000</option>


                      
                    </select>
                    </div>
                
                    
                </div>
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>



        </Fragment>
    )
}

export default InputAudience;