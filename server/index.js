//import React, { Fragment, useEffect, useState } from "react";
//import express from "express";
const express=require("express");
const app=express();
//import cors from "cors";
const Pool=require("pg").Pool;

const cors=require("cors");
//const pool=require("./db");
// const [password,setPassword]=useState("");
// const [role,setRole]=useState("");
// const [pool,setPool]=useState("");

let pool;




app.use(cors());
app.use(express.json());

app.post("/login",async(req,res)=>{
    try {
        const {role,password}=req.body;
        //const {year}=req.body;
        console.log(role,password)
        connectionString = `postgresql://${role}:${password}@localhost:5432/olympics2`;
         pool=new Pool({
            // user:{role},
            // password:{password},
            // host:"localhost",
            // post:5432,
            // database:"olympics"
            connectionString: connectionString
        });
        
        console.log("help")
        console.log(pool)
        console.log("hello")
        const item=await pool.query(
            "select * from event")
        res.json(item.rows)
        console.log(item.rows)
        module.exports = { pool };

        
        
    } catch (err) {
        console.log(err.message)
    }
})


//Routes
app.post("/event",async(req,res)=>{
    try {
        const{event_name,record,record_holder_id}=req.body;
        const newEvent=await pool.query("INSERT INTO event(event_name,world_record,record_holder_id) VALUES($1,$2,$3) RETURNING *",
        [event_name,record,record_holder_id]);

        res.json(newEvent.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/event",async(req,res)=>{
    try {
        const allEvents=await pool.query("SELECT * from event");
        res.json(allEvents.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/event/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const event=await pool.query("SELECT * from event where event_id = $1",[id])
        res.json(event.rows[0])
        
    } catch (err) {
        console.log(err)
    }
})


app.put("/event/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {event_id,event_name,record,record_holder_id}=req.body;
        console.log("i am here",event_id,event_name,record,record_holder_id)
        const updateEvent=await pool.query(
            "UPDATE event SET event_name=$1 ,world_record=$2, record_holder_id=$3 where event_id=$4",
        [event_name,record,record_holder_id,event_id])
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/event/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteEvent=await pool.query(
            "DELETE FROM event WHERE event_id=$1",[id])
        res.json("event was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})
app.listen(5000,()=>{
    console.log("server ha started on port 5000");

})
//participant

app.post("/participant",async(req,res)=>{
    try {
        const{country_id,player_name,gender,age,weight}=req.body;
        const newEvent=await pool.query("INSERT INTO participant(country_id,player_name,gender,age,weight) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [country_id,player_name,gender,age,weight]);

        res.json(newEvent.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/participant",async(req,res)=>{
    try {
        const allParticipants=await pool.query("SELECT * from participant");
        res.json(allParticipants.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/participant/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const participant=await pool.query(` select p.player_id, p.player_name,c.country_name,p.gender,p.age,p.weight from PARTICIPANT as p,
        Country as c where
        c.country_id=p.country_id and p.player_id=$1`,[id])
        res.json(participant.rows[0])
        
    } catch (err) {
        console.log(err)
    }
})


app.put("/participant/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {country_id,player_name,gender,age,weight}=req.body;
        const updateParticipant=await pool.query(
            "UPDATE participant SET player_name=$1, gender=$2 ,age=$3 ,weight=$4, country_id=$5 where player_id=$6",
        [player_name,gender,age,weight,country_id,id])
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/participant/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteParticipant=await pool.query(
            "DELETE FROM participant WHERE player_id=$1",[id])
        res.json("participant was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})



app.get("/country/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const event=await pool.query("SELECT * from country where country_id = $1",[id])
        res.json(event.rows[0])
        
    } catch (err) {
        console.log(err)
    }
})


app.get("/country",async(req,res)=>{
    try {
        const {id}=req.params;
        const event=await pool.query("SELECT * from country")
        res.json(event.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/competes",async(req,res)=>{
    try {
        const {id}=req.params;
        const event=await pool.query("SELECT * from competes")
        res.json(event.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/competes/:event_id/:player_id",async(req,res)=>{
    try {
        const {event_id,player_id}=req.params;
        const {year}=req.body;
        const event=await pool.query("SELECT * from competes where event_id = $1 and player_id = $2",[event_id,player_id])
        res.json(event.rows[0])
        
    } catch (err) {
        console.log(err)
    }
})

app.put("/competes/:evid/:pid/:yearid",async(req,res)=>{
    try {
        const {evid,pid,yearid}=req.params;
        const {event_id,player_id,year,score}=req.body;
        console.log(evid,pid,yearid)
        console.log(event_id,player_id,year)
        const updateCompetes=await pool.query(
            "UPDATE competes SET player_id=$1, event_id=$2 ,year=$3, score=$4 where event_id = $5 and player_id=$6 and year=$7",
        [player_id,event_id,year,score,evid,pid,yearid ])
        console.log("success")
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/competes/:event_id/:player_id/:year",async(req,res)=>{
    try {
        const {event_id,player_id,year}=req.params;
        //const {year}=req.body;
        const deleteCompetes=await pool.query(
            "DELETE FROM competes WHERE event_id=$1 and player_id=$2 and year=$3",[event_id,player_id,year])
        res.json("competes was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.post("/competes",async(req,res)=>{
    try {
        const{event_id,player_id,year,score}=req.body;
        console.log("in server",event_id,player_id,year);
        const newCompetes=await pool.query("INSERT INTO competes(event_id,player_id,year) VALUES($1,$2,$3) RETURNING *",
        [event_id,player_id,year,score]);

        res.json(newCompetes.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.post("/winner",async(req,res)=>{
    try {
        const{event_id,player_id,year,medal}=req.body;
        const newWinner=await pool.query("INSERT INTO winner(event_id,player_id,year,medal) VALUES($1,$2,$3,$4) RETURNING *",
        [event_id,player_id,year,medal]);

        res.json(newWinner.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/winner",async(req,res)=>{
    try {
        const {id}=req.params;
        const event=await pool.query("SELECT * from winner")
        res.json(event.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.put("/winner/:evid/:pid/:yearid",async(req,res)=>{
    try {
        const {evid,pid,yearid}=req.params;
        const {event_id,player_id,year,medal}=req.body;
        console.log(evid,pid,yearid)
        console.log(event_id,player_id,year)
        const updateCompetes=await pool.query(
            "UPDATE winner SET player_id=$1, event_id=$2 ,year=$3,medal=$4 where event_id = $5 and player_id=$6 and year=$7",
        [player_id,event_id,year,medal,evid,pid,yearid ])
        console.log("success")
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/winner/:event_id/:player_id/:year",async(req,res)=>{
    try {
        const {event_id,player_id,year}=req.params;
        //const {year}=req.body;
        console.log(event_id,player_id,year)
        const deleteCompetes=await pool.query(
            "DELETE FROM winner WHERE event_id=$1 and player_id=$2 and year=$3",[event_id,player_id,year])
        res.json("competes was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})


app.get("/user",async(req,res)=>{
    try {
        const {id}=req.params;
        const event=await pool.query("SELECT current_user")
        res.json(event.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/medalcountry/:year",async(req,res)=>{
    try {
        const {year}=req.params;
        console.log(year)
        const event=await pool.query(`

        SELECT country_name, GOLD, SILVER,BRONZE from(
       
       (
       SELECT country_name,COUNT(w.medal) as GOLD from COUNTRY as c
       LEFT OUTER JOIN PARTICIPANT as p ON p.country_id=c.country_id
       LEFT OUTER JOIN WINNER AS w ON p.player_id=w.player_id AND w.medal='Gold' AND w.year=$1
       GROUP BY country_name
       ) as g natural JOIN
       (
           SELECT country_name,COUNT(w.medal) as SILVER from COUNTRY as c
       LEFT OUTER JOIN PARTICIPANT as p ON p.country_id=c.country_id
       LEFT OUTER JOIN WINNER AS w ON p.player_id=w.player_id AND w.medal='Silver' AND w.year=$1
       
       GROUP BY country_name
       
       ) AS s natural JOIN
       (
           SELECT country_name,COUNT(w.medal) as BRONZE from COUNTRY as c
       LEFT OUTER JOIN PARTICIPANT as p ON p.country_id=c.country_id
       LEFT OUTER JOIN WINNER AS w ON p.player_id=w.player_id AND w.medal='Bronze'AND w.year=$1
       GROUP BY country_name
       
       ) AS b
       
       )
       
            `,[year])
        res.json(event.rows)
        
    } catch (err) {
        console.log(err)
    }
})



app.get("/year",async(req,res)=>{
    try {
        //const {id}=req.params;
        //console.log(pool)
        const event=await pool.query("SELECT distinct year from competes")
        console.log(event.rows)
        res.json(event.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.get("/viewevents/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const participant=await pool.query(` select e.event_id, e.event_name, com.year,e.world_record,e.record_holder_id from PARTICIPANT as p,
        Competes as com, Event as e where com.player_id=p.player_id and com.event_id=e.event_id and p.player_id=$1;`,[id])
        res.json(participant.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.get("/viewwins/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const participant=await pool.query(` 
        select e.event_id, e.event_name, w.year ,w.medal from PARTICIPANT as p,
        Event as e, WINNER as w where w.player_id=p.player_id and w.event_id=e.event_id and p.player_id=$1`,[id])
        res.json(participant.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.post("/venue",async(req,res)=>{
    try {
        const{venue_name,no_of_seats,type}=req.body;
        console.log(venue_name,no_of_seats,type)
        const newVenue=await pool.query("INSERT INTO venue(venue_name,no_of_seats,type) VALUES($1,$2, $3) RETURNING *",
        [venue_name,no_of_seats,type]);
        console.log("hello",venue_name,no_of_seats,type)

        res.json(newVenue.rows);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/venue",async(req,res)=>{
    try {
        const allVenues=await pool.query("SELECT * from venue");
        res.json(allVenues.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.post("/heldAt",async(req,res)=>{
    try {
        const{event_id,venue_id,date}=req.body;
        console.log("in server",event_id,venue_id,date);
        const newHeldAt=await pool.query("INSERT INTO held_at(event_id,venue_id,date) VALUES($1,$2,$3) RETURNING *",
        [event_id,venue_id,date]);

        res.json(newHeldAt.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/heldAt/:event_id/:venue_id",async(req,res)=>{
    try {
        const {event_id,venue_id}=req.params;
        const {date}=req.body;
        const heldAt=await pool.query("SELECT * from held_at where event_id = $1 and venue_id = $2",[event_id,venue_id])
        res.json(heldAt.rows[0])
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/heldAt",async(req,res)=>{
    try {
        const heldAt=await pool.query("SELECT h.venue_id ,h.event_id, date(h.date) as date from held_at as h")
        res.json(heldAt.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.post("/penalty",async(req,res)=>{
    try {
        const{event_id,player_id,year,type}=req.body;
        const newPenalty=await pool.query("INSERT INTO penalty(player_id,event_id,year,type) VALUES($1,$2,$3,$4) RETURNING *",
        [player_id,event_id,year,type]);

        res.json(newPenalty.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})

app.get("/penalty",async(req,res)=>{
    try {
        const allPenalties=await pool.query("SELECT * from penalty");
        res.json(allPenalties.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.post("/audience",async(req,res)=>{
    try {
        const{venue_id,person_name,ticket_price,event_id,date}=req.body;
        const newEvent=await pool.query("INSERT INTO audience(venue_id,person_name,ticket_price,event_id,date) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [venue_id,person_name,ticket_price,event_id,date]);

        res.json(newEvent.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})


app.get("/venueevent/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        const allPenalties=await pool.query(`
        
select distinct(h.event_id), e.event_name from Venue as v, 
HELD_AT as h, Event as e where v.venue_id=h.venue_id and h.event_id=e.event_id and v.venue_id=$1;
        `,[id]);
        res.json(allPenalties.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.get("/dates/:venue_id/:event_id",async(req,res)=>{
    try {
        const {venue_id,event_id}=req.params;

        const allPenalties=await pool.query(`
        select h.venue_id, v.venue_name, h.event_id,e.event_name, h.date from Venue as v, 
        HELD_AT as h, Event as e where v.venue_id=h.venue_id and h.event_id=e.event_id and h.venue_id=$1 and h.event_id=$2;
        `,[venue_id,event_id]);
        res.json(allPenalties.rows)
        
    } catch (err) {
        console.log(err)
    }
})


app.get("/audience",async(req,res)=>{
    try {
        const allAudience=await pool.query("SELECT * from audience");
        res.json(allAudience.rows)
        
    } catch (err) {
        console.log(err)
    }
})

app.post("/equipment",async(req,res)=>{
    try {
        const{event_id,cost,type}=req.body;
        console.log(event_id,cost,type)
        const newEquipment=await pool.query("INSERT INTO equipment(event_id,cost,type) VALUES($1,$2,$3) RETURNING *",
        [event_id,cost,type]);

        res.json(newEquipment.rows[0]);

        console.log(req.body);
        
    } catch (err) {
        console.log(err.message);
        
    }
})


app.get("/equipment",async(req,res)=>{
    try {
        const allEquipments=await pool.query("SELECT * from equipment");
        res.json(allEquipments.rows)
        
    } catch (err) {
        console.log(err)
    }
})



app.put("/venue/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {venue_name,no_of_seats,type}=req.body;
        const updateVenue=await pool.query(
            "UPDATE venue SET venue_name=$1, no_of_seats=$2, type=$3 where venue_id=$4",
        [venue_name,no_of_seats,type,id])
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/venue/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteVenue=await pool.query(
            "DELETE FROM venue WHERE venue_id=$1",[id])
        res.json("Venue was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.put("/penalty/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {penalty_id,player_id,event_id,year,type}=req.body;
        console.log( penalty_id, player_id, event_id,year, type)

        const updatePenalty=await pool.query(
            "UPDATE penalty SET player_id=$1 ,event_id=$2 ,year=$3,type=$4 where penalty_id=$5",
        [player_id,event_id,year,type,id])
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
        res.json('error')
    }
})


app.delete("/penalty/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deletePenalty=await pool.query(
            "DELETE FROM penalty WHERE penalty_id=$1",[id])
        res.json("penalty was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/audience/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteAudience=await pool.query(
            "DELETE FROM audience WHERE ticket_id=$1",[id])
        res.json("audience was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.put("/audience/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {venue_id,event_id,date,person_name,ticket_price}=req.body;
        const updateParticipant=await pool.query(
            "UPDATE audience SET venue_id=$1, event_id=$2, date=$3, person_name=$4 , ticket_price=$5 where ticket_id=$6",
        [venue_id,event_id,date,person_name,ticket_price,id ])
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.put("/heldAt/:evid/:vid/:day_id/:month_id/:year_id",async(req,res)=>{
    try {
        const {evid,vid,day_id,month_id,year_id}=req.params;
        const {event_id,venue_id,date}=req.body;
        var newdate=`${day_id}/${month_id}/${year_id}`

        console.log(evid,vid,day_id,month_id,year_id)
        console.log(event_id,venue_id,date)
        const updateHeldAt=await pool.query(
            "UPDATE held_at SET venue_id=$1, event_id=$2 ,date=$3 where venue_id=$4 and event_id = $5 and date=$6",
        [event_id,venue_id,date,evid,vid,newdate ])
        console.log("success")
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/heldAt/:event_id/:venue_id/:day/:month/:year",async(req,res)=>{
    try {
        const {event_id,venue_id,date,day,month,year}=req.params;
        var newdate=`${day}/${month}/${year}`
        console.log(newdate)

        console.log(event_id,venue_id,newdate)
        //const {year}=req.body;
        const deleteHeldAt=await pool.query(
            "DELETE FROM held_at WHERE event_id=$1 and venue_id=$2 and date=$3",[event_id,venue_id,newdate])
        res.json("held at was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.put("/equipment/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {event_id,cost,type}=req.body;
        const updateParticipant=await pool.query(
            "UPDATE equipment SET event_id=$1 ,cost=$2, type=$3 where equip_id=$4",
        [event_id,cost,type,id])
        res.json("todo was updated")
        
    } catch (err) {
        console.log(err.message)
    }
})

app.delete("/equipment/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteParticipant=await pool.query(
            "DELETE FROM equipment WHERE equip_id=$1",[id])
        res.json("equipment was deleted")
        
    } catch (err) {
        console.log(err.message)
    }
})


app.get("/venueeventget/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        const allPenalties=await pool.query(`
        
select h.event_id,h.date, e.event_name from Venue as v, 
HELD_AT as h, Event as e where v.venue_id=h.venue_id and h.event_id=e.event_id and v.venue_id=$1;
        `,[id]);
        res.json(allPenalties.rows)
        
    } catch (err) {
        console.log(err)
    }
})
