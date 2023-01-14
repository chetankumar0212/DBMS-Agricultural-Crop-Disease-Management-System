const express = require('express');//required for building backend
const app = express();
const mysql = require('mysql');// importing mysql database
const cors = require('cors'); //importing cors library
app.use(express.json())// using json format

app.use(
    cors({
        origin : "*"
    })
)

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Chetan@0202',
    database : 'plant_disease_pesticide3'
})

app.get("/",(req,res)=>{
    const query = 'show tables'
    db.query(query,(err,result)=>{
        if(err) throw err;
        else{
            console.log(result);
            // res.send(result);
        }
    })
    res.send('hello from /')
})

app.post("/login",(req,res)=>{
    let query = `select * from user where email="${req.body.email}"`
    db.query(query,(err,result)=>{
        if(err) throw err;
        else{
            if(result.length === 0){
                res.send("no_user")
            }else{
                let dbPass = result[0].password;
                if(dbPass === req.body.password){
                    res.send("ok")
                }else{
                    res.send('bad')
                }
            }
        }
    })
})

app.post('/Signup',(req,res)=>{
    let body = req.body;
    let query = `insert into user(user_name, email , password) values("${body.name}","${body.email}","${body.password}")`
    let query2 = `select * from user where email = "${body.email}"`

    db.query(query2,(err,result)=>{
        if(err) throw err;
        else if(result.length === 1){
            res.send('already_customer')
        }else{
            db.query(query,(err,result)=>{
                if(err) throw err;
                else{
                    res.send('addded')
                }
            })
        }
    })
})

app.post('/getuserdetails',(req,res)=>{
    let reqemail = req.body.email;
    db.query(`select * from user where email = "${reqemail}"`,(err,result)=>{
        if(err) throw err;
        else{
            res.json(result)
        }
    })
})

app.get('/crops',(req,res)=>{
    db.query('select * from crop',(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})

app.post('/crop',(req,res)=>{
    let query = `select * from disease as d join precaution as pr on pr.disease_id = d.disease_id join pesticide as p on p.pesticide_id = d.pesticide_id and crop_id = ${req.body.crop_id};`
    db.query(query,(err,result)=>{
        if(err) throw err;
        else{
            res.json(result);
        }
    })
})

app.post('/getuserId',(req,res)=>{
    db.query(`select user_id from user where email = '${req.body.email}'`,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/feedback',(req,res)=>{
    console.log(req.body);
    let query = `insert into feedback(user_id,feedback,crop_id,disease_id) values(${req.body.user_id},'${req.body.feedback}',${req.body.crop_id},${req.body.disease_id})`
    db.query(query,(err,result)=>{
        if(err) throw err;
        else{
            res.send('ok')
        }
    })
})

app.listen(4000,()=>{
    console.log('server running on port 4000');
})
