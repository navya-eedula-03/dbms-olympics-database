import React,{Fragment,useEffect,useState} from 'react';
import EditAudience from './EditAudience';
const ListAudience=()=>{

    const[audiences,setAudiences]=useState([]);
    const [venues, setVenues] = useState([]);
    const[user,setUser]=useState("");
    const [events, setEvents] = useState([]);
    let date;
    let dt;
    let month
    let date1
    let year
    let newdate

    function getEventName(id) {
        const event = events.filter(c => c.event_id === id)
        console.log(typeof (event))
        if (event.length > 0) {
            console.log(event[0].country_name)
            return event[0].event_name;
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


    
    const deleteAudience=async (id)=>{
        try {
            const delAudience=await fetch(`http://localhost:5000/audience/${id}`,{
                method:"DELETE"
            });

            setAudiences(audiences.filter(audience =>audience.ticket_id !==id));
        } catch (err) {
            console.error(err.message)
        }
    }

    // const deleteEvent=async (id)=>{
    //     try {
    //         const delEvent=await fetch(`http://localhost:5000/event/${id}`,{
    //             method:"DELETE"
    //         });

    //         setEvents(events.filter(event =>audience.ticket_id !==id));
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }
    const getAudiences=async()=>{
        try {
            const response=await fetch("http://localhost:5000/audience")
            const jsonData= await response.json()
            console.log(jsonData)
            setAudiences(jsonData)
        } catch (err) {
            console.log(err.message)
            
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
    useEffect(()=>{

        getAudiences();
        getVenue();
        getUser();
        getEvents()
    },[]);

    function getEventName(id) {
        const event = events.filter(c => c.event_id === id)
        console.log(typeof (event))
        if (event.length > 0) {
            console.log(event[0].country_name)
            return event[0].event_name;
        }

    }

    function getVenueName(id) {
        const venue=venues.filter(c =>c.venue_id ===id)
        console.log(typeof(venue))
        if(venue.length>0){
            console.log(venue[0].venue_name)
        return venue[0].venue_name;
        }
        
      }


    return (<Fragment>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Ticket ID</th>
        <th>Venue</th>
        <th>Event Name</th>
        <th>Date</th>
        <th>Person Name</th>
        <th>Ticket Price</th>
        
      </tr>
    </thead>
    <tbody>
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {audiences.map(audience=>(
          date=audience.date,
          console.log(date),
          dt=new Date(date).toLocaleDateString({ timeZone: 'UTC' }),
          month=dt.substring(0,2),
  date1=dt.substring(2,5),
 year=dt.substring(5,9),
 newdate=date1+month+year,
  console.log(newdate),

        <tr key={audience.ticket_id}>
            <td>{audience.ticket_id}</td>
            <td>{getVenueName(audience.venue_id)}</td>
            <td>{getEventName(audience.event_id)}</td>
            <td>{newdate}</td>
            <td>{audience.person_name}</td>
            <td>{audience.ticket_price}</td>

             {(user==='ioc' || user =='audience_member')?
            <><td><EditAudience item={audience}/></td>
            <td><button className="btn btn-danger" onClick={()=>deleteAudience(audience.ticket_id)}>Delete</button></td></>:''} 

        </tr>))}
      
    </tbody>
  </table>
    </Fragment>
    );
}

export default ListAudience;