import React, { Fragment, useEffect, useState } from 'react';

const EditHeldAt = ({ item }) => {

    const [venue_id, setVenue_id] = useState(item.venue_id);
    const [vid, setVid] = useState(item.venue_id)
    const [evid, setEvid] = useState(item.event_id)
    const [dateid, setDateid] = useState(item.date)


    const [event_id, setEvent_id] = useState(item.event_id);
    const [date, setDate] = useState(item.date);
    const [country_id, setCountry_id] = useState(item.country_id);
    const [countries, setCountries] = useState([]);
    const [events, setEvents] = useState([]);
    const [venues, setVenues] = useState([]);
    const [heldAts, setHeldAts] = useState([]);

    function getEventName(id) {
        const event = events.filter(c => c.event_id === id)
        console.log(typeof (event))
        if (event.length > 0) {
            console.log(event[0].country_name)
            return event[0].event_name;
        }

    }

    function getVenueName(id) {
        const venue = venues.filter(c => c.venue_id === id)
        console.log(venues)
        if (venue.length > 0) {
            console.log(venue[0].venue_name)
            return venue[0].venue_name;
        }

    }
    let dt;
    let month
    let date1
    let year
    let newdate
    function getDate(date) {
        dt = new Date(date).toLocaleDateString({ timeZone: 'UTC' })
            month = dt.substring(0, 2)
            date1 = dt.substring(2, 5)
            year = dt.substring(5, 9)
            newdate = date1 + month + year
            console.log(newdate)
        return newdate;


    }


    // const getCountry = async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/country")
    //         const jsonData = await response.json()
    //         console.log(jsonData)
    //         setCountries(jsonData)
    //     } catch (err) {
    //         console.log(err.message)

    //     }
    // }

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


    const getHeldAts = async () => {
        try {
            const response = await fetch("http://localhost:5000/heldAt")
            const jsonData = await response.json()
            console.log(jsonData)
            setHeldAts(jsonData)
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
    useEffect(() => {

        getVenues();
        getEvents();
        getHeldAts();
        setDate(getDate(date))

    }, []);
    // function getCountryName(id) {
    //     const country = countries.filter(c => c.country_id === id)
    //     if (country.length > 0) {
    //         console.log(country[0].country_name)
    //         return country[0].country_name;
    //     }


    // }

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

    let venueList = venues.length > 0
        && venues.map((item, i) => {
            return (
                <option key={item.venue_id} value={item.venue_id}>{item.venue_name}</option>
            )
        }, this);


    //edit
    const update = async e => {
        e.preventDefault();

        try {
            console.log("hellooo")
            var dt = new Date(dateid).toLocaleDateString()
            var month_id = dt.substring(0, 1)
            var day_id = dt.substring(2, 4)
            var year_id = dt.substring(5, 9)
            console.log(day_id,month_id,year_id)
            const body = { event_id, venue_id, date };
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/heldAt/${evid}/${vid}/${day_id}/${month_id}/${year_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(response)
            window.location = "/heldat";

        } catch (err) {
            console.log("hellooo noo")

            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${item.venue_id}${item.event_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${item.venue_id}${item.event_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Venue Info</h4>
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
                                        <label htmlFor='event_id'>Venue ID</label>
                                        <div class="form-group col-md-4">
                                            <select id="inputState" class="form-control" onChange={e => setVenue_id(e.target.value)}>
                                                <option selected value={venue_id}>{getVenueName(venue_id)}</option>
                                                {venueList}

                                            </select>

                                        </div>


                                        <div class="form-group">
                                            <label for="event_name">Date</label>
                                            <input type="text"
                                                class="form-control"
                                                id="country_id"
                                                value={date}
                                                onChange={e => setDate(e.target.value)} />
                                        </div>
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
export default EditHeldAt;