import React,{Fragment,useState} from 'react';

const EditVenue=({venue})=>{

  const[venue_name,setVenue_name]=useState(venue.venue_name);
  const[venue_id,setVenue_id]=useState(venue.venue_id);
  const [no_of_seats, setSeats] = useState(venue.no_of_seats);
  const [type, setType] = useState(venue.type);


  //edit
  const update=async e =>{
    e.preventDefault();

    try {
      console.log("helooo")
      const body={venue_name, no_of_seats, type};
      console.log(JSON.stringify(body))
      const response=await fetch(`http://localhost:5000/venue/${venue_id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(body)
    
      });
      console.log(response)
      window.location="/venue";
      
    } catch (err) {
      console.log("helooo noo")

      console.error(err.message);
    }

  }
    return(
        <Fragment>
   <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${venue.venue_id}`}>
  Edit
</button>

<div class="modal" id={`id${venue.venue_id}`}>
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">Edit venue</h4>
        <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
      </div>

      <div class="modal-body">
      {/* <form class="form-inline" onSubmit={onSubmitForm}> */}
      <form class="form-horizontal" >
            <div class="form-inline">
    
                <div class="form-group">
                    <label for="venue_name">Venue Name</label>
                    <input type="text"
                        class="form-control"
                        id="venue_name"
                        value={venue_name}
                        onChange={e => setVenue_name(e.target.value)} />
                </div>
                
                <div class="form-group  mt-3">
                                        <label for="no_of_seats">Number of Seats</label>
                                        <input type="text"
                                            class="form-control"
                                            id="event_id"
                                            value={no_of_seats}
                                            onChange={e => setSeats(e.target.value)} />
                                    </div>
                <div class="form-group  mt-3">
                                        <label for="type">Type</label>
                                        <input type="text"
                                            class="form-control"
                                            id="event_id"
                                            value={type}
                                            onChange={e => setType(e.target.value)} />
                                    </div>
                </div>
            </form>
      </div>
      <div class="modal-footer">
                <button type='submit' className='btn btn-warning ' onClick={e=>update(e)}>Edit</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
</div>
        </Fragment>
    )
}
export default EditVenue;