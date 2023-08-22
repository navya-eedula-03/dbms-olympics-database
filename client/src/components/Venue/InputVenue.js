import React, { Fragment, useState } from "react";


const InputVenue = () => {

    const [venue_id, setVenue_id] = useState("");
    const [venue_name, setVenue_name] = useState("");
    const [no_of_seats, setSeats] = useState("");
    const [type, setType] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { venue_name, no_of_seats, type };
            console.log(JSON.stringify(body))
            const response = await fetch("http://localhost:5000/venue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location="/venue";

        } catch (err) {
            console.log(err.message)
        }

    }
    return (
        <Fragment>
            <h1 className='text-center mt-5'>Input Venue</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
            <form class="form-inline" onSubmit={onSubmitForm}>
            
                <div class="form-group col-md-4">
                    <label for="venue_name">Venue Name</label>
                    <input type="text"
                        class="form-control"
                        id="venue_name"
                        value={venue_name}
                        onChange={e => setVenue_name(e.target.value)} />
                </div>
                <div class="form-group col-md-4">
                        <label for="no_of_seats">Number of Seats</label>
                        <input type="text"
                            class="form-control"
                            id="no_of_seats"
                            value={no_of_seats}
                            onChange={e => setSeats(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Type</label>
                        <input type="text"
                            class="form-control"
                            id="country_id"
                            value={type}
                            onChange={e => setType(e.target.value)} />
                    </div>
                {/* <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd"/>
  </div> */}
                {/* <div class="checkbox">
    <label><input type="checkbox"/> Remember me</label>
  </div> */}
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

        </Fragment>
    )
}

export default InputVenue;