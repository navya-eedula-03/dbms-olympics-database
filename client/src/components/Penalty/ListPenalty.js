import React,{Fragment,useEffect,useState} from 'react';
import EditPenalty from './EditPenalty';
const ListPenalty=()=>{

    const[penalties,setPenalties]=useState([]);
    const [players, setPlayers] = useState([]);
    const [events, setEvents] = useState([]);
    const[user,setUser]=useState("");

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
    const getPlayer = async () => {
        try {
            const response = await fetch("http://localhost:5000/participant")
            const jsonData = await response.json()
            console.log(jsonData)
            setPlayers(jsonData)
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
    
    const deletePenalty=async (id)=>{
        try {
            const deletePenalty=await fetch(`http://localhost:5000/penalty/${id}`,{
                method:"DELETE"
            });

            setPenalties(penalties.filter(penalty =>penalty.penalty_id !==id));
        } catch (err) {
            console.error(err.message)
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
    const getPenalties=async()=>{
        try {
            const response=await fetch("http://localhost:5000/penalty")
            const jsonData= await response.json()
            console.log(jsonData)
            setPenalties(jsonData)
        } catch (err) {
            console.log(err.message)
            
        }
    }

    function getPlayerName(id) {
        const player=players.filter(c =>c.player_id ===id)
        console.log(typeof(country))
        if(player.length>0){
            console.log(player[0].player_name)
        return player[0].player_name;
        }
    }    
    function getEventName(id) {
            const event=events.filter(c =>c.event_id ===id)
            console.log(typeof(event))
            if(event.length>0){
                console.log(event[0].event_name)
            return event[0].event_name;
            }
        
      }
    useEffect(()=>{

        getPenalties();
        getEvents();
        getPlayer();
        getUser();
    },[]);


    return (<Fragment>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Penalty ID</th>
        <th>Player Name</th>
        <th>Event Name</th>
        <th>Year</th>
        <th>Type</th>

     
      </tr>
    </thead>
    <tbody>
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {penalties.map(penalty=>(

        <tr key={penalty.penalty_id}>
            <td>{penalty.penalty_id}</td>
            <td>{getPlayerName(penalty.player_id)}</td>
            <td>{getEventName(penalty.event_id)}</td>
            <td>{penalty.year}</td>
            <td>{penalty.type}</td>
 
            {(user==='judge'||user==='ioc')?
            <><td><EditPenalty item={penalty}/></td>
            <td><button className="btn btn-danger" onClick={()=>deletePenalty(penalty.penalty_id)}>Delete</button></td></>:''}

        </tr>))}
      
    </tbody>
  </table>
    </Fragment>
    );
      }

export default ListPenalty;