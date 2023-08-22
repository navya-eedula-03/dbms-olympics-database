import React,{Fragment,useEffect,useState} from 'react';
import EditEquipment from './EditEquipment';
const ListEquipment=()=>{

    const[equipments,setEquipments]=useState([]);
    const [events, setEvents] = useState([]);
    const[user,setUser]=useState("");



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
    
    const deleteEquipment=async (id)=>{
        try {
            const delEquipment=await fetch(`http://localhost:5000/equipment/${id}`,{
                method:"DELETE"
            });

            setEquipments(equipments.filter(equipment =>equipment.equip_id !==id));
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
    const getEquipments=async()=>{
        try {
            const response=await fetch("http://localhost:5000/equipment")
            const jsonData= await response.json()
            console.log(jsonData)
            setEquipments(jsonData)
        } catch (err) {
            console.log(err.message)
            
        }
    }
    const getUser=async()=>{
        try {
            const response=await fetch("http://localhost:5000/user")
            const jsonData= await response.json()
            console.log("hello",jsonData[0].current_user)
            setUser(jsonData[0].current_user)
        } catch (err) {
            console.log(err.message)
            
        }
    }
    useEffect(()=>{

        getEquipments();
        getEvent();
        getUser();
    },[]);


    function getEventName(id) {
        const event=events.filter(c =>c.event_id ===id)
        console.log(typeof(event))
        if(event.length>0){
            console.log(event[0].event_name)
        return event[0].event_name;
        }
        
      }


    return (<Fragment>
        <table class="table mt-5 text-center">
    <thead>
      <tr>
        <th>Equipment ID</th>
        <th>Event Name</th>
        <th>Cost</th>
        <th>Type</th>

      </tr>
    </thead>
    <tbody>
        
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {equipments.map(equipment=>(

        <tr key={equipment.equip_id}>
        <td>{equipment.equip_id}</td>
            <td>{getEventName(equipment.event_id)}</td>
            <td>{equipment.cost}</td>
            <td>{equipment.type}</td>
            {(user === 'ioc')?
            <><td><EditEquipment item={equipment}/></td>
            <td><button className="btn btn-danger" onClick={()=>deleteEquipment(equipment.equip_id)}>Delete</button></td></>:''}

        </tr>))}
      
    </tbody>
  </table>
    </Fragment>
    );
}

export default ListEquipment;