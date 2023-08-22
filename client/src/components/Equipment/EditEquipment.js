import React, { Fragment, useEffect, useState } from 'react';

const EditEquipment = ({ item }) => {

    const [equip_id, setEquipment_id] = useState(item.equip_id);

    const [cost, setCost] = useState(item.cost);
    const [type, setType] = useState(item.type);

    const [event_id, setEvent_id] = useState(item.event_id);
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
    function getEventName(id) {
        const event=events.filter(c =>c.event_id ===id)
        if(event.length>0){
            console.log(event[0].event_name)
        return event[0].event_name;
        }
        
      
    }

    // setEvent_id=(val)=>{
    //     console.log(val)
    // }

    let eventsList = events.length > 0
        && events.map((item, i) => {
            return (
                <option key={item.event_id} value={item.event_id}>{item.event_name}</option>
            )
        }, this);

    //edit
    const update = async e => {
        e.preventDefault();

        try {
            console.log("helooo")
            const body = { event_id,cost, type };
            console.log(JSON.stringify(body))
            const response = await fetch(`http://localhost:5000/equipment/${equip_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)

            });
            console.log(response)
            window.location = "/equipment";

        } catch (err) {
            console.log("helooo noo")

            console.error(err.message);
        }

    }
    return (
        <Fragment>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${item.equip_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${item.equip_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Equipment Info</h4>
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
                <div class="form-inline">
                 <div class="form-group">
                    <label for="equip_id" class="col-md-4 text-left">Event ID</label>

                    <input
                        type="text"
                        class="form-control"
                        id="equip_id"
                        value={equip_id}
                        onChange={e => setEquipment_id(e.target.value)} />
                </div>
                                    <div class="form-group  mt-3">
                                        <label for="event_id" class="col text-left">Event</label>

                                        {/* <input
                        type="text"
                        class="form-control"
                        id="event_id"
                        value={event_id}
                        onChange={e => setEvent_id(e.target.value)} /> */}
                                        <div class="form-group ">
                                            <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                                                <option selected value={event_id}>{getEventName(event_id)}</option>
                                                {eventsList}

                                            </select>

                                        </div>
                                    </div>

                    <div class="form-group  mt-3">
                                        <label for="type">Cost</label>
                                        <input type="text"
                                            class="form-control"
                                            id="cost"
                                            value={cost}
                                            onChange={e => setCost(e.target.value)} />
                                    </div>
                                    <div class="form-group  mt-3">
                                        <label for="type">Type</label>
                                        <input type="text"
                                            class="form-control"
                                            id="type"
                                            value={type}
                                            onChange={e => setType(e.target.value)} />
                                    </div>
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
export default EditEquipment;

