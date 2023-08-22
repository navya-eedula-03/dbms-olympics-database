import { getListSubheaderUtilityClass } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import EditWinner from './EditWinner';
const ListWinner = () => {

    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);
    const [winners, setWinners] = useState([]);
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


    const getWinner = async () => {
        try {
            const response = await fetch("http://localhost:5000/winner")
            const jsonData = await response.json()
            console.log(jsonData)
            setWinners(jsonData)
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

    const deleteWinner = async (plid,evid,yearid) => {
        console.log("p,and e",evid,plid,yearid);
        try {
            const delEvent = await fetch(`http://localhost:5000/winner/${evid}/${plid}/${yearid}`, {
                method: "DELETE"
            });
            //console.log(winners.filter(winner => (winner.player_id === plid) && (compete.event_id === evid) && (compete.year === yearid)));
            //setCompetes(competes.filter(compete => (compete.player_id !== plid) && (compete.event_id !== evid) && (compete.year !== yearid)));
            window.location = "/winner";
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
        getWinner();
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
                    <th>Medal</th>

                </tr>
            </thead>
            <tbody>
                {winners.map((winner, i) => (

                    <tr key={i}>
                        <td>{i}</td>
                        <td>{getPlayerName(winner.player_id)}</td>
                        <td>{getEventName(winner.event_id)}</td>
                        <td>{winner.year}</td>
                        <td>{winner.medal}</td>
{/*                         
    <td><EditWinner item={winner}/></td>
    <td><button className="btn btn-danger" onClick={()=>deleteWinner(winner.player_id,winner.event_id,winner.year)}>Delete</button></td>  */}
{(user === 'ioc' || user === 'judge') ?                   
    <><td><EditWinner item={winner}/></td>
    <td><button className="btn btn-danger" onClick={()=>deleteWinner(winner.player_id,winner.event_id,winner.year)}>Delete</button></td> </>
                            : ''
                        }
                    </tr>))}

            </tbody>
        </table>
    </Fragment>
    );
}

export default ListWinner;