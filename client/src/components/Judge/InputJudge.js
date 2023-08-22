import React, { Fragment, useEffect, useState } from "react";


const InputJudge = () => {

    const [judge_id, setJudge_id] = useState("");
   
    const [experience, setExperience] = useState("");
    const [score, setScore] = useState("");

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


        console.log("event_id", event_id)
        // console.log("weight", weight)

        // console.log("gender", gender)

        // console.log("name", player_name)


        try {
                const body = { event_id, experience,score };
                console.log(JSON.stringify(body))
                const response = await fetch("http://localhost:5000/judge", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log("i am a judge")
                window.location = "/judge";
    
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
            <h1 className='text-center mt-5'>Input Judge</h1>
            {/* <form className="d-flex mt-5">
            <input type="text" className="form-control"/>
            <button className='btn btn-success'>Add</button>

        </form> */}
            <form className="form-inline" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor='event_id'>Event Name</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => setEvent_id(e.target.value)}>
                        <option>Select..</option>
                            {eventsList}

                        </select>

                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Experience</label>
                        <input type="text"
                            class="form-control"
                            id="experience"
                            value={experience}
                            onChange={e => setExperience(e.target.value)} />
                    </div>
                    <div class="form-group col-md-4">
                        <label for="event_name">Score</label>
                        <input type="text"
                            class="form-control"
                            id="score"
                            value={score}
                            onChange={e => setScore(e.target.value)} />
                    </div>
    

                </div>
                <button type='submit' className='btn btn-success mt-4'>Add</button>

            </form>

            


        </Fragment>
    )
}

export default InputJudge;