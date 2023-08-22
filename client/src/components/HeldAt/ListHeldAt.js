import React, { Fragment, useEffect, useState } from 'react';
import EditHeldAt from './EditHeldAt';
const ListHeldAt = () => {

    const [events, setEvents] = useState([]);
    const [venues, setVenues] = useState([]);
    const [heldAt, setHeldAt] = useState([]);
    const[user,setUser]=useState("");

    let date;
           let dt;
           let month
           let date1
           let year
           let newdate
           

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


    const getHeldAt = async () => {
        try {
            const response = await fetch("http://localhost:5000/heldAt")
            const jsonData = await response.json()
            console.log("hello",jsonData)
            setHeldAt(jsonData)
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

    const deleteHeldAt = async (vid,evid,dateid) => {
        console.log("p,and e",vid,evid,dateid);
                var dt = new Date(date).toLocaleDateString({ timeZone: 'UTC' })
               var  month = dt.substring(0, 2)
               var date1 = dt.substring(2, 5)
                var year = dt.substring(5, 9)
                var newdate = date1 + month + year
    
        try {
            const delEvent = await fetch(`http://localhost:5000/heldAt/${evid}/${vid}/${newdate}`, {
                method: "DELETE"
            });
            console.log(heldAt.filter(heldAt => (heldAt.venue_id === vid) && (heldAt.event_id === evid) && (heldAt.date === dateid)));
            //setCompetes(competes.filter(compete => (compete.player_id !== plid) && (compete.event_id !== evid) && (compete.year !== yearid)));
            window.location = "/heldat";
        } catch (err) {
            console.error(err.message)
        }
    }
    const getUser=async()=>{
        try {
            const response=await fetch("http://localhost:5000/user")
            const jsonData= await response.json()
            console.log("hello",jsonData[0].current_user)
            setUser(jsonData[0].current_user)
        } catch (err) {
            console.log(err.message)
            
        }
    }

    // const deleteEvent=async (id)=>{
    //     try {
    //         const delEvent=await fetch(`http://localhost:5000/event/${id}`,{
    //             method:"DELETE"
    //         });

    //         setEvents(events.filter(event =>participant.player_id !==id));
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    useEffect(() => {

        getVenues();
        getEvents();
        getHeldAt();
        getUser();
    }, []);


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


    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Sl.no</th>
                    <th>Venue</th>
                    <th>Event</th>
                    <th>Date</th>

                </tr>
            </thead>
            <tbody>
                {heldAt.map((h, i) => (
                    date=h.date,
                    console.log(date),
                    dt=new Date(date).toLocaleDateString({ timeZone: 'UTC' }),
                    month=dt.substring(0,2),
            date1=dt.substring(2,5),
           year=dt.substring(5,9),
           newdate=date1+month+year,
            console.log(newdate),

            
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{getVenueName(h.venue_id)}</td>
                        <td>{getEventName(h.event_id)}</td>
                        <td>{newdate}</td>
                         {(user === 'ioc')?
    <>
     <td><EditHeldAt item={h}/></td> 
    <td><button className="btn btn-danger" onClick={()=>deleteHeldAt(h.venue_id,h.event_id,h.date)}>Delete</button></td></>:''} 

                    </tr>))}

            </tbody>
        </table>
    </Fragment>
    );
}

export default ListHeldAt;