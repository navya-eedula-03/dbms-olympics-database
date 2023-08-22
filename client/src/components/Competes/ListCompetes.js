import React, { Fragment, useEffect, useState } from 'react';
import EditCompetes from './EditCompetes';
const ListCompetes = () => {

    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);
    const [competes, setCompetes] = useState([]);
    const[user,setUser]=useState("");



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

    const getCompetes = async () => {
        try {
            const response = await fetch("http://localhost:5000/competes")
            const jsonData = await response.json()
            console.log(jsonData)
            setCompetes(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    const getParticipants = async () => {
        try {
            const response = await fetch("http://localhost:5000/participant")
            const jsonData = await response.json()
            console.log(jsonData)
            setPlayers(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }

    const deleteCompetes = async (plid,evid,yearid) => {
        console.log("p,and e",plid,evid,yearid);
        try {
            const delEvent = await fetch(`http://localhost:5000/competes/${evid}/${plid}/${yearid}`, {
                method: "DELETE"
            });
            console.log(competes.filter(compete => (compete.player_id === plid) && (compete.event_id === evid) && (compete.year === yearid)));
            //setCompetes(competes.filter(compete => (compete.player_id !== plid) && (compete.event_id !== evid) && (compete.year !== yearid)));
            window.location = "/competes";
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

    useEffect(() => {

        getParticipants();
        getEvents();
        getCompetes();
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

    function getPlayerName(id) {
        const player = players.filter(c => c.player_id === id)
        console.log(players)
        if (player.length > 0) {
            console.log(player[0].player_name)
            return player[0].player_name;
        }

    }


    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Sl.no</th>
                    <th>Player</th>
                    <th>Event</th>
                    <th>Year</th>
                    <th>Score</th>

                </tr>
            </thead>
            <tbody>
                {competes.map((compete, i) => (

                    <tr key={i}>
                        <td>{i}</td>
                        <td>{getPlayerName(compete.player_id)}</td>
                        <td>{getEventName(compete.event_id)}</td>
                        <td>{compete.year}</td>
                        <td>{compete.score}</td>
                        {(user==='ioc' || user === 'judge')?                    
    <><td><EditCompetes item={compete}/></td>
    <td><button className="btn btn-danger" onClick={()=>deleteCompetes(compete.player_id,compete.event_id,compete.year)}>Delete</button></td></>:''} 
{/*               
    <td><EditCompetes item={compete}/></td>
    <td><button className="btn btn-danger" onClick={()=>deleteCompetes(compete.player_id,compete.event_id,compete.year)}>Delete</button></td> */}

                    </tr>))}

            </tbody>
        </table>
    </Fragment>
    );
}

export default ListCompetes;