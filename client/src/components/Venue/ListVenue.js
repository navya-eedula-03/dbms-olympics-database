import React,{Fragment,useEffect,useState} from 'react';
import EditVenue from './EditVenue';
const ListVenue=()=>{

    const[venues,setVenues]=useState([]);
    const[user,setUser]=useState("");
    
    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:5000/user")
            const jsonData = await response.json()
            console.log("hello", jsonData[0].current_user)
            setUser(jsonData[0].current_user)
        } catch (err) {
            console.log(err.message)

        }
    }

    const deleteVenue=async (id)=>{
        try {
            const delVenue=await fetch(`http://localhost:5000/venue/${id}`,{
                method:"DELETE"
            });

            setVenues(venues.filter(venue =>venue.venue_id !==id));
        } catch (err) {
            console.error(err.message)
        }
    }
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
    useEffect(()=>{

        getVenues();
        getUser();
    },[]);

    console.log(venues)

    return (<Fragment>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>venue_id</th>
        <th>venue_name</th>
        <th>no_of_seats</th>
        <th>type</th>


      </tr>
    </thead>
    <tbody>
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {venues.map(venue=>(
        <tr key={venue.venue_id}>
            <td>{venue.venue_id}</td>
            <td>{venue.venue_name}</td>
            <td>{venue.no_of_seats}</td>
            <td>{venue.type}</td>
{/*             
    {(user === 'ioc') ?
        <><td><EditEvent venue={event} /></td><td><button className="btn btn-danger" onClick={() => deleteEvent(event.event_id)}>Delete</button></td></>
        : ''
    } */}


             {(user==='ioc')?
            <><td><EditVenue venue={venue}/></td>
            <td><button className="btn btn-danger" onClick={()=>deleteVenue(venue.venue_id)}>Delete</button></td></>:''} 

        </tr>))}
      
    </tbody>
  </table>
    </Fragment>
    );
}

export default ListVenue;