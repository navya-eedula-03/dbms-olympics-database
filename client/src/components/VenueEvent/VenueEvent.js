import React,{Fragment,useEffect,useState} from 'react';
const VenueEvent=()=>{

    const[participants,setParticipants]=useState([]);
    const [medalcountry, setMedalCountry] = useState([]);
    const [events, setEvents] = useState([]);
    const [venue_id, setVenue_id] = useState('');
    const[venues,setVenues]=useState([]);

    let date;
           let dt;
           let month
           let date1
           let year
           let newdate
           



    
    const getVenues=async()=>{
        try {
            const response=await fetch("http://localhost:5000/venue")
            const jsonData= await response.json()
            console.log(jsonData)
            setVenues(jsonData)
        } catch (err) {
            console.log(err.message)
            
        }
    }
    function getDate(date) {
        dt = new Date(date).toLocaleDateString({ timeZone: 'UTC' })
            month = dt.substring(0, 2)
            date1 = dt.substring(2, 5)
            year = dt.substring(5, 9)
            newdate = date1 + month + year
            console.log(newdate)
        return newdate;


    }


    const getEvents = async (id) => {
        try {

            const response = await fetch(`http://localhost:5000/venueeventget/${id}`)
            const jsonData = await response.json()
            console.log(jsonData,"yes")
            console.log("hellooooo2")
            setEvents(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    
    // const deleteParticipant=async (id)=>{
    //     try {
    //         const delEvent=await fetch(`http://localhost:5000/participant/${id}`,{
    //             method:"DELETE"
    //         });

    //         setParticipants(participants.filter(participant =>participant.player_id !==id));
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

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
    const getParticipants=async()=>{
        try {
            const response=await fetch("http://localhost:5000/participant")
            const jsonData= await response.json()
            console.log(jsonData)
            setParticipants(jsonData)
        } catch (err) {
            console.log(err.message)
            
        }
    }
    useEffect(()=>{

        //getMedalCountry();
        getVenues();
        console.log("hellooooo")
    },[]);

    let venueList = venues.length > 0
    && venues.map((item, i) => {
        return (
            <option key={item.venue_id} value={item.venue_id}>{item.venue_name}</option>
        )
    }, this);
        
   


    // function getCountryName(id) {
    //     const country=countries.filter(c =>c.country_id !==id)
    //     console.log(typeof(country))
    //     if(country.length>0){
    //         console.log(country[0].country_name)
    //     return country[0].country_name;
    //     }
        
    //   }

    //<select id="inputState" class="form-control" onChange={e => {setYear(e.target.value);getMedalCountry(e.target.value)}}>

    return (<Fragment>

                    <div class="form-group mx-auto col-md-4">
                    <label htmlFor='event_id'>Venue</label>

                        <select id="inputState" class="form-control" onChange={e => {setVenue_id(e.target.value);getEvents(e.target.value)}}>
                        <option>Select..</option>
                            {venueList}

                        </select>

                    </div>
                    
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Sl. no</th>
        <th>Event</th>
        <th>Date</th>
       

      </tr>
    </thead>
    <tbody>
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {/* {medalcountry.map(mc=>(

        <tr key={mc.player_id}>
            <td>{player.player_id}</td>
            <td>{getCountryName(player.country_id)}</td>
            <td>{player.player_name}</td>
            <td>{player.gender}</td>
            <td>{player.age}</td>
            <td>{player.weight}</td>
            <td><EditParticipant item={player}/></td>
            <td><button className="btn btn-danger" onClick={()=>deleteParticipant(player.player_id)}>Delete</button></td>

        </tr>))
        
        
        
        
        } */}

{events.map((mc, i) => (

<tr key={i}>
    <td>{i}</td>
    <td>{mc.event_name}</td>
    <td>{getDate(mc.date)}</td>


</tr>))}

      
    </tbody>
  </table>
    </Fragment>
    );
}

export default VenueEvent;