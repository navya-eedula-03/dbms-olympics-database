import React,{Fragment,useEffect,useState} from 'react';
const MedalCountry=()=>{

    const[participants,setParticipants]=useState([]);
    const [medalcountry, setMedalCountry] = useState([]);
    const [years, setYearsList] = useState([]);
    const [year, setYear] = useState('');




    const getMedalCountry = async (year) => {
        try {
            const response = await fetch(`http://localhost:5000/medalcountry/${year}`)
            const jsonData = await response.json()
            console.log(jsonData)
            setMedalCountry(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    

    const getYears = async () => {
        try {

            const response = await fetch("http://localhost:5000/year")
            const jsonData = await response.json()
            console.log(jsonData,"yes")
            console.log("hellooooo2")
            setYearsList(jsonData)
        } catch (err) {
            console.log(err.message)

        }
    }
    
    // const deleteParticipant=async (id)=>{
    //     try {
    //         const delEvent=await fetch(`http://localhost:5000/participant/${id}`,{
    //             method:"DELETE"
    //         });

    //         setParticipants(participants.filter(participant =>participant.player_id !==id));
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

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
    const getParticipants=async()=>{
        try {
            const response=await fetch("http://localhost:5000/participant")
            const jsonData= await response.json()
            console.log(jsonData)
            setParticipants(jsonData)
        } catch (err) {
            console.log(err.message)
            
        }
    }
    useEffect(()=>{

        //getMedalCountry();
        getYears();
        console.log("hellooooo")
    },[]);

    let yearList = years.length > 0
    && years.map((item, i) => {
        return (
            <option key={item.year} value={item.year}>{item.year}</option>
        )
    }, this);

        
   


    // function getCountryName(id) {
    //     const country=countries.filter(c =>c.country_id !==id)
    //     console.log(typeof(country))
    //     if(country.length>0){
    //         console.log(country[0].country_name)
    //     return country[0].country_name;
    //     }
        
    //   }

    //<select id="inputState" class="form-control" onChange={e => {setYear(e.target.value);getMedalCountry(e.target.value)}}>

    return (<Fragment>

                    <label htmlFor='event_id'>Player ID</label>
                    <div class="form-group col-md-4">
                        <select id="inputState" class="form-control" onChange={e => {setYear(e.target.value);getMedalCountry(e.target.value)}}>
                        <option>Select..</option>
                            {yearList}

                        </select>

                    </div>
                    
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Sl. no</th>
        <th>Country</th>
        <th>Gold</th>
        <th>Silver</th>
        <th>Bronze</th>
        

      </tr>
    </thead>
    <tbody>
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {/* {medalcountry.map(mc=>(

        <tr key={mc.player_id}>
            <td>{player.player_id}</td>
            <td>{getCountryName(player.country_id)}</td>
            <td>{player.player_name}</td>
            <td>{player.gender}</td>
            <td>{player.age}</td>
            <td>{player.weight}</td>
            <td><EditParticipant item={player}/></td>
            <td><button className="btn btn-danger" onClick={()=>deleteParticipant(player.player_id)}>Delete</button></td>

        </tr>))
        
        
        
        
        } */}

{medalcountry.map((mc, i) => (

<tr key={i}>
    <td>{i}</td>
    <td>{mc.country_name}</td>
    <td>{mc.gold}</td>
    <td>{mc.silver}</td>
    <td>{mc.bronze}</td>


</tr>))}

      
    </tbody>
  </table>
    </Fragment>
    );
}

export default MedalCountry;