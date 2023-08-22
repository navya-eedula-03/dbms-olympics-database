import React, { Fragment, useEffect, useState } from 'react';
import EditParticipant from './EditParticipant';
const ListParticipant = () => {

    const [participants, setParticipants] = useState([]);
    const [countries, setCountries] = useState([]);

    const [user, setUser] = useState("");


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
    useEffect(() => {

        getParticipants();
        getCountry();
        getUser();
    }, []);


    function getCountryName(id) {
        const country = countries.filter(c => c.country_id === id)
        console.log(country)
        console.log(typeof (country))
        if (country.length > 0) {
            console.log(country[0].country_name)
            return country[0].country_name;
        }

    }


    return (<Fragment>
        <table class="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Player ID</th>
                    <th>Country</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Weight</th>
                 

                </tr>
            </thead>
            <tbody>

                {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
                {participants.map(player => (

                    <tr key={player.player_id}>
                        <td>{player.player_id}</td>
                        <td>{getCountryName(player.country_id)}</td>
                        <td>{player.player_name}</td>
                        <td>{player.gender}</td>
                        <td>{player.age}</td>
                        <td>{player.weight}</td>
                        {console.log("hello,",user)}

                        {(user === 'ioc'||user === 'player') ?
                            <>
                                <td><EditParticipant item={player} /></td>
                                <td><button className="btn btn-danger" onClick={() => deleteParticipant(player.player_id)}>Delete</button></td></> : ''}

                    </tr>))}

            </tbody>
        </table>
    </Fragment>
    );
}

export default ListParticipant;



// {/*              
//             {(user === 'ioc' || user === 'player') ?
//             <><td><EditParticipant item={player}/></td>
//             <td><button className="btn btn-danger" onClick={()=>deleteParticipant(player.player_id)}>Delete</button></td></>
//                             : ''} */}
//             {/* <td><EditParticipant item={player}/></td>
//             <td><button className="btn btn-danger" onClick={()=>deleteParticipant(player.player_id)}>Delete</button></td> */}
//             {/* {(user === 'ioc'|| user === 'player')?
//     <>
//      <td><EditParticipant item={player}/></td> 
//     <td><button className="btn btn-danger" onClick={()=>deleteParticipant(player.player_id)}>Delete</button></td></>:''}  */}