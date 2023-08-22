import React, { Fragment, useEffect, useState } from "react";


const InputParticipant = () => {

    const [player_id, setPlayer_id] = useState("");
    const [player_name, setPlayer_name] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [country_id, setCountry_id] = useState("");
    const [countries, setCountries] = useState([]);



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
    useEffect(() => {

        getCountry();

    }, []);


    // setCountry_id=(val)=>{
    //     console.log(val)
    // }

    let countriesList = countries.length > 0
        && countries.map((item, i) => {
            return (
                <option key={item.country_id} value={item.country_id}>{item.country_name}</option>
            )
        }, this);

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("hello")


        console.log("country_id", country_id)
        console.log("weight", weight)

        console.log("gender", gender)

        console.log("name", player_name)


        try {
                const body = { country_id, player_name, gender,age,weight };
                console.log(JSON.stringify(body))
                const response = await fetch("http://localhost:5000/participant", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am a participant")
                window.location = "/participants";
    
            } catch (err) {
                console.log(err.message)
            }

        // e.preventDefault();
        // try {
        //     const body = { event_id, event_name };
        //     console.log(JSON.stringify(body))
        //     const response = await fetch("http://localhost:5000/event", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(body)
        //     });
        //     window.location = "/events";

        // } catch (err) {
        //     console.log(err.message)
        // }

    }
    return (
        <Fragment>
            <h1 className='text-center mt-5'>Input Player</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
            <form className="form-inline" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor='country_id'>Country ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setCountry_id(e.target.value)}>
                        <option>Select..</option>
                            {countriesList}

                        </select>

                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Participant Name</label>
                        <input type="text"
                            class="form-control"
                            id="player_name"
                            value={player_name}
                            onChange={e => setPlayer_name(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Age</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={age}
                            onChange={e => setAge(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Gender</label>
                    <select class="form-control" onChange={e => setGender(e.target.value)}>
                        <option>Choose..</option>
                        <option  value="F">Female</option>
                        <option value="M">Male</option>
                      
                    </select>
                    </div>
                    <div class="form-group">
                        <label for="event_name">Weight</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={weight}
                            onChange={e => setWeight(e.target.value)} />
                    </div>

                </div>
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

            {/* 
                                 <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setCountry_id(e.target.value)}>
                        {countriesList}
                            
                                 </select>

                                 </div> */}

            {/* {countries.map(country => (

<option value="select">Select</option>
<option value="Java">Java</option>
<option value="C++">C++</option>
                            ))} */}
            {/* 
        // <tr key={country.country_id}>
        //     <td>{event.event_id}</td>
        //     <td>{event.event_name}</td>
        //     <td><EditEvent event={event}/></td>
        //     <td><button className="btn btn-danger" onClick={()=>deleteEvent(event.event_id)}>Delete</button></td>

        // </tr>))}
                            // <option selected>Choose...</option>
                            // <option>{country_name}</option> */}



            {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setCountry_id(e.target.value)} /> */}

            {/* <div class="form-group">
                    <label for="event_name">Event Name</label>
                    <input type="text"
                        class="form-control"
                        id="country_id"
                        value={event_name}
                        onChange={e => setEvent_name(e.target.value)} />
                </div> */}
            {/* <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd"/>
  </div> */}
            {/* <div class="checkbox">
    <label><input type="checkbox"/> Remember me</label>
  </div> */}


        </Fragment>
    )
}

export default InputParticipant;