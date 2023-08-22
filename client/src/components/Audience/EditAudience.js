import React, { Fragment, useEffect, useState } from 'react';

const EditAudience = ({ item }) => {

    const [ticket_id, setTicket_id] = useState(item.ticket_id);

    const [person_name, setPerson_name] = useState(item.person_name);
    const [ticket_price, setTicket_price] = useState(item.ticket_price);

    const [venue_id, setVenue_id] = useState(item.venue_id);
    const [venues, setVenues] = useState([]);
    const [events, setEvents] = useState([]);
    const [dates, setDates] = useState([]);

    const [event_id, setEvent_id] = useState(item.event_id);
    const [date, setDate] = useState(item.date);
    let dt;
    let month
    let date1
    let year
    let newdate


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
    let eventList = events.length > 0
    && events.map((item, i) => {
        return (
            <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
        )
    }, this);

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
    useEffect(() => {

        getVenue();


    }, []);
    function getVenueName(id) {
        const venue = venues.filter(c => c.venue_id === id)
        if (venue.length > 0) {
            console.log(venue[0].venue_name)
            return venue[0].venue_name;
        }


    }
    function getEventName(id) {
        const event = events.filter(c => c.event_id === id)
        console.log(typeof (event))
        if (event.length > 0) {
            console.log(event[0].country_name)
            return event[0].event_name;
        }

    }

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

    //edit
    const update = async e => {
        e.preventDefault();

        try {
            console.log("helooo")
            const body = { venue_id,event_id,date, person_name, ticket_price };
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/audience/${ticket_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(response)
            window.location = "/audience";

        } catch (err) {
            console.log("helooo noo")

            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${item.ticket_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${item.ticket_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Audience Info</h4>
                            <button type="button" class="close" data-bs-dismiss="modal" onClick={()=>{setVenue_id(item.venue_id);setEvent_id(item.event_id);setDate(item.date);setPerson_name(item.person_name);setTicket_price(item.ticket_price)}}>&times;</button>
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
                                        <label for="venue_id" class="col text-left">Venue</label>

                                       
                                        <div class="form-group ">
                                            <select id="inputState" class="form-control" onChange={e => {setVenue_id(e.target.value);getEvents(e.target.value)}}>
                                                
                                                <option selected value={venue_id}>{getVenueName(venue_id)}</option>
                                                {venuesList}

                                            </select>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor='venue_id'>Event Name</label>
                                        <div class="form-group col-md-4">
                                            <select id="inputState" class="form-control" onChange={e => { setEvent_id(e.target.value); getDates(e.target.value) }}>
                                            <option selected value={event_id}>{getEventName(event_id)}</option>

                                                {eventList}

                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                    <label htmlFor='venue_id'>Date</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => {setDate(e.target.value)}}>
                        {dt=new Date(date).toLocaleDateString({ timeZone: 'UTC' }),
          month=dt.substring(0,2),
  date1=dt.substring(2,5),
 year=dt.substring(5,9),
 newdate=date1+month+year,
  console.log(newdate)}
                        <option selected value={newdate}>{newdate}</option>

                            {dateList}

                        </select>
                        </div>

                    </div>
                                    <div class="form-group  mt-3">
                                        <label for="event_name">Person Name</label>
                                        <input type="text"
                                            class="form-control"
                                            id="person_name"
                                            value={person_name}
                                            onChange={e => setPerson_name(e.target.value)} />
                                    </div>


                                    <div class="form-group  mt-3">
                                        <label for="ticket_price">Person Name</label>
                                        <input type="text"
                                            class="form-control"
                                            id="ticket_price"
                                            value={ticket_price}
                                            onChange={e => setTicket_price(e.target.value)} />
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
export default EditAudience;