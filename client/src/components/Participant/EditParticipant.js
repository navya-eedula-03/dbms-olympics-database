import React, { Fragment, useEffect, useState } from 'react';

const EditParticipant = ({ item }) => {

    const [player_id, setPlayer_id] = useState(item.player_id);

    const [player_name, setPlayer_name] = useState(item.player_name);
    const [gender, setGender] = useState(item.gender);
    const [age, setAge] = useState(item.age);
    const [weight, setWeight] = useState(item.weight);

    const [country_id, setCountry_id] = useState(item.country_id);
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
    function getCountryName(id) {
        const country=countries.filter(c =>c.country_id ===id)
        if(country.length>0){
            console.log(country[0].country_name)
        return country[0].country_name;
        }
        
      
    }

    // setCountry_id=(val)=>{
    //     console.log(val)
    // }

    let countriesList = countries.length > 0
        && countries.map((item, i) => {
            return (
                <option key={item.country_id} value={item.country_id}>{item.country_name}</option>
            )
        }, this);

    //edit
    const update = async e => {
        e.preventDefault();

        try {
            console.log("helooo")
            const body = { country_id, player_name, gender, age, weight };
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/participant/${player_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(response)
            window.location = "/participants";

        } catch (err) {
            console.log("helooo noo")

            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${item.player_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${item.player_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Participant Info</h4>
                            <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            {/* <form class="form-inline" onSubmit={onSubmitForm}> */}
                            <form class="form-horizontal" >
                                <div class="form-inline">
                                    {/* <div class="form-group">
                    <label for="event_id" class="col text-left"> ID</label>

                    <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} />
                </div>  */}
                                    <div class="form-group  mt-3">
                                        <label for="country_id" class="col text-left">Country</label>

                                        {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} /> */}
                                        <div class="form-group ">
                                            <select id="inputState" class="form-control" onChange={e => setCountry_id(e.target.value)}>
                                                <option selected value={country_id}>{getCountryName(country_id)}</option>
                                                {countriesList}

                                            </select>

                                        </div>
                                    </div>

                                    <div class="form-group  mt-3">
                                        <label for="event_name">Player Name</label>
                                        <input type="text"
                                            class="form-control"
                                            id="event_name"
                                            value={player_name}
                                            onChange={e => setPlayer_name(e.target.value)} />
                                    </div>

                                    <div class="form-group mt-3">
                        <label for="gender">Gender</label>
                    <select class="form-control" onChange={e => setGender(e.target.value)}>
                        <option selected value={gender}>{gender}</option>
                        <option  value="F">F</option>
                        <option value="M">M</option>
                      
                    </select>
                    </div>
                    <div class="form-group  mt-3">
                                        <label for="weight">Age</label>
                                        <input type="text"
                                            class="form-control"
                                            id="age"
                                            value={age}
                                            onChange={e => setAge(e.target.value)} />
                                    </div>
                                    <div class="form-group  mt-3">
                                        <label for="weight">Weight</label>
                                        <input type="text"
                                            class="form-control"
                                            id="weight"
                                            value={weight}
                                            onChange={e => setWeight(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type='submit' className='btn btn-warning ' onClick={e => update(e)}>Edit</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EditParticipant;