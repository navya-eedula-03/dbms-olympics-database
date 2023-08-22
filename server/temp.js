import React, { Fragment, useEffect, useState } from "react";
const express=require("express");
const app=express();
const cors=require("cors");
const pool=require("./db");



app.use(cors());
app.use(express.json());

//Routes
app.post("/event",async(req,res)=>{
    try {
        const{event_id,event_name}=req.body;
        const newEvent=await pool.query("INSERT INTO event(event_id,event_name) VALUES($1,$2) RETURNING *",
        [event_id,event_name]);

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
        const {event_id,event_name}=req.body;
        const updateEvent=await pool.query(
            "UPDATE event SET event_name=$1 where event_id=$2",
        [event_name,event_id])
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
        const participant=await pool.query("SELECT * from event where player_id = $1",[id])
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
        const {event_id,player_id,year}=req.body;
        console.log(evid,pid,yearid)
        console.log(event_id,player_id,year)
        const updateCompetes=await pool.query(
            "UPDATE competes SET player_id=$1, event_id=$2 ,year=$3 where event_id = $4 and player_id=$5 and year=$6",
        [player_id,event_id,year,evid,pid,yearid ])
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
        const{event_id,player_id,year}=req.body;
        console.log("in server",event_id,player_id,year);
        const newCompetes=await pool.query("INSERT INTO competes(event_id,player_id,year) VALUES($1,$2,$3) RETURNING *",
        [event_id,player_id,year]);

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


app.post("/login",async(req,res)=>{
    try {
        const {role,password}=req.body;
        //const {year}=req.body;
        console.log(role,password)
        
        pool=new Pool({
            user:{role},
            password:{password},
            host:"localhost",
            post:5432,
            database:"olympics"
        });
        setPool(pool)
        
        
    } catch (err) {
        console.log(err.message)
    }
})
