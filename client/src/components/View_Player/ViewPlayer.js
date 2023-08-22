import React, { Fragment, useEffect, useState } from 'react';
const ViewPlayer = () => {

    const [participants, setParticipants] = useState([]);
    const [countries, setCountries] = useState([]);
    const [player_id, setPlayer_id] = useState('');
    const [player, setPlayer] = useState([]);
    const [events, setEvents] = useState([]);
    const [wins, setWins] = useState([]);






    const getCountry = async () => {
        try {
            const response = await fetch("http://localhost:5000/country")
            const jsonData = await response.json()
            console.log(jsonData)
            setCountries(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }

    const deleteParticipant = async (id) => {
        try {
            const delEvent = await fetch(`http://localhost:5000/participant/${id}`, {
                method: "DELETE"
            });

            setParticipants(participants.filter(participant => participant.player_id !== id));
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
    const getParticipants = async () => {
        try {
            const response = await fetch("http://localhost:5000/participant")
            const jsonData = await response.json()
            console.log(jsonData)
            setParticipants(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }


    const getPlayer = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/participant/${id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setPlayer(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    const getEvents = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/viewevents/${id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setEvents(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    const getWins = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/viewwins/${id}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setWins(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    useEffect(() => {

        getParticipants();
        getCountry();
    }, []);


    function getCountryName(id) {
        const country = countries.filter(c => c.country_id === id)
        console.log(typeof (country))
        if (country.length > 0) {
            console.log(country[0].country_name)
            return country[0].country_name;
        }

    }

    let playerList = participants.length > 0
        && participants.map((item, i) => {
            return (
                <option key={item.player_id} value={item.player_id}>{item.player_name}</option>
            )
        }, this);

    return (<Fragment>





        <label htmlFor='event_id'>Player</label>
        <div class="form-group col-md-4">
            <select id="inputState" class="form-control" onChange={e => { setPlayer_id(e.target.value); getPlayer(e.target.value); getEvents(e.target.value);getWins(e.target.value)}}>
                <option>Select..</option>
                {playerList}

            </select>

        </div>
        {/* <label htmlFor='event_id'>Player ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => {setYear(e.target.value);getMedalCountry(e.target.value)}}>
                        <option>Select..</option>
                            {yearList}

                        </select>

                    </div> */}
  
        <div class="row mt-5">
            <div class="card text-white bg-primary mb-3 col-md-4" >
                <div class="card-header"><h5>Details</h5> </div>
                <div class="card-body">
                    <h5 class="card-title">{player.player_name}</h5>
                    <p class="card-text">Player ID: {player.player_id}</p>
                    <p class="card-text">Name: {player.player_name}</p>
                    <p class="card-text">Country: {player.country_name}</p>
                    <p class="card-text">Gender: {player.gender}</p>
                    <p class="card-text">Age: {player.age}</p>
                    <p class="card-text">Weight: {player.weight}</p>

                </div>
            </div>
            <div class="card text-white bg-danger mb-3 col-md-4" >
                <div class="card-header"><h5>Events</h5> </div>
                <div class="card-body">
                    {events.map((event,i) => (
                        <><h5 class="card-title">{i+1} {event.event_name}</h5>
                        <p class="card-text">Year: {event.year}</p>
                        <p class="card-text">Event Name: {event.event_name}</p>
                        <p>     </p>
                      </>
                    ))}
                </div>
            </div>
        
        <div class="card text-white bg-warning mb-3 col-md-4" >
                <div class="card-header"><h5>Wins</h5> </div>
                <div class="card-body">
                    {wins.map((win,i) => (
                        <><h5 class="card-title">: {win.medal}</h5>
                        <p class="card-text">Year: {win.year}</p>
                        <p class="card-text">Medal: {win.medal}</p>
                        <p class="card-text">Event Name: {win.event_name}</p>

                        <p>     </p>
                      </>
                    ))}
                </div>
            </div>
            </div>
        
    </Fragment>
    );
}

export default ViewPlayer;