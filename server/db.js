const Pool=require("pg").Pool;


const pool=new Pool({
    user:"postgres",
    password:"cheese",
    host:"localhost",
    post:5432,
    database:"olympics"
});

module.exports=pool;