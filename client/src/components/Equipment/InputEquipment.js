import React, { Fragment, useEffect, useState } from "react";


const InputEquipment = () => {

    const [equip_id, setEquipment_id] = useState("");
    const [year, setYear] = useState("");
    const [cost, setCost] = useState("");
    const [type, setType] = useState("");
    const [event_id, setEvent_id] = useState("");
    const [events, setEvents] = useState([]);



    const getEvent = async () => {
        try {
            const response = await fetch("http://localhost:5000/event")
            const jsonData = await response.json()
            console.log(jsonData)
            setEvents(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    useEffect(() => {

        getEvent();

    }, []);


    // setEvent_id=(val)=>{
    //     console.log(val)
    // }

    let eventsList = events.length > 0
        && events.map((item, i) => {
            return (
                <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
            )
        }, this);

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log("hello")

        console.log("cost", cost)

        console.log("type", type)


        try {
                const body = { event_id, cost, type };
                console.log(JSON.stringify(body))
                const response = await fetch("http://localhost:5000/equipment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am a equipment")
                window.location = "/equipment";
    
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
            <h1 className='text-center mt-5'>Input Equipment</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
                {/* <div class="form-group">
                    <label for="equip_id">Equipment ID</label>
                    <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={equip_id}
                        onChange={e => setEquipment_id(e.target.value)} />
                </div> */}
            <form className="form-inline" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor='event_id'>Event ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                        <option>Select..</option>
                            {eventsList}

                        </select>
                        
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Type</label>
                        <input type="text"
                            class="form-control"
                            id="event_id"
                            value={type}
                            onChange={e => setType(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Cost</label>
                        <input type="text"
                            class="form-control"
                            id="event_id"
                            value={cost}
                            onChange={e => setCost(e.target.value)} />
                        
                    </div>
                    

                </div>
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

            {/* 
                                 <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                        {eventsList}
                            
                                 </select>

                                 </div> */}

            {/* {events.map(event => (

<option value="select">Select</option>
<option value="Java">Java</option>
<option value="C++">C++</option>
                            ))} */}
            {/* 
        // <tr key={event.event_id}>
        //     <td>{event.event_id}</td>
        //     <td>{event.event_name}</td>
        //     <td><EditEvent event={event}/></td>
        //     <td><button className="btn btn-danger" onClick={()=>deleteEvent(event.event_id)}>Delete</button></td>

        // </tr>))}
                            // <option selected>Choose...</option>
                            // <option>{event_name}</option> */}



            {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} /> */}

            {/* <div class="form-group">
                    <label for="event_name">Event Name</label>
                    <input type="text"
                        class="form-control"
                        id="event_id"
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

export default InputEquipment;