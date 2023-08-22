import React, { Fragment, useEffect, useState } from 'react';
import EditEvent from './EditEvent';
const ListEvent = () => {

    const [events, setEvents] = useState([]);
    const [user, setUser] = useState("");
    const [players, setPlayers] = useState([]);



    const deleteEvent = async (id) => {
        try {
            const delEvent = await fetch(`http://localhost:5000/event/${id}`, {
                method: "DELETE"
            });

            setEvents(events.filter(event => event.event_id !== id));
        } catch (err) {
            console.error(err.message)
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
    useEffect(() => {

        getEvents();
        getUser();
        getParticipants();

    }, []);

    console.log(events)

    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>event_id</th>
                    <th>event_name</th>
                    <th>World Record</th>
                    <th>World Record Holder</th>


                </tr>
            </thead>
            <tbody>

                {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
                {events.map(event => (

                    <tr key={event.event_id}>
                        <td>{event.event_id}</td>
                        <td>{event.event_name}</td>
                        <td>{event.world_record}</td>
                        <td>{getPlayerName(event.record_holder_id)}</td>
                        {(user === 'ioc') ?
                            <><td><EditEvent event={event} /></td><td><button className="btn btn-danger" onClick={() => deleteEvent(event.event_id)}>Delete</button></td></>
                            : ''
                        }
                    </tr>))}

            </tbody>
        </table>
    </Fragment>
    );
}

export default ListEvent;