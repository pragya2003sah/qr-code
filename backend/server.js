const express = require("express");
const mysql= require('mysql');
const cors=require('cors');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const qr = require("qrcode");

const app= express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
    name: 'its session cookoi',
    secret: 'secret',
    resave: false,
    saveUninitialized:false,
    cookie:{
        secure: false,//currently not using https
        maxAge: 1000*60*60*24//expires in 1 day
    }
}))

const db=mysql.createConnection({
     host: "localhost",
     user: "root",
     port: 4000,
     password: "",
     database: "signup"
    }
)

app.post('/signup',(req,res)=>{
     const sql ="INSERT INTO login(`name`,`email`,`password`) VALUES (?)";
     const values =[
        req.body.name,
        req.body.email,
        req.body.password
     ]
     db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
     })
})
app.post('/',(req,res)=>{
    const sql ="SELECT * FROM login WHERE `email` = ? AND `password`=? ";

    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
       if(err){
           return res.json("Error");
       }
    if(data.length>0 ){
        req.session.name =data[0].name;
        return res.json({ login : true});
    } else{
        return res.json("fail");
    }
    })
})
app.post('/home',(res,req) => {
    if(req.session.name){
        return res.json({ valid: true , name:req.session.name})
    }else{
        return res.json({valid:false})
    }
})


app.listen(8081,()=>{
    console.log("server is listening");
})