require('dotenv').config()
// console.log(process.env.SECRET)
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const encrypt = require("mongoose-encryption");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/UsersDB");

const userSchima = mongoose.Schema({
    email:String,
    password:String
})


userSchima.plugin(encrypt,{secret:process.env.SECRET, encryptedFields: ['password']});

const User = mongoose.model("User",userSchima);


app.get("/",function(req,res){
    res.render("home");
})

app.get("/register",function(req,res){
    res.render("register");
})
app.get("/login",function(req,res){
    res.render("login");
})

app.get("/logout",function(req,res){
    res.render("home");
})

app.get("/submit",function(req,res){
    res.render("submit");
})

app.post("/register",function(req,res){
    const newUser = new User({
        email:req.body.username,
        password:req.body.password
    })
    newUser.save();
    res.render("secrets");
})

app.post("/login",function(req,res){
    User.findOne({email:req.body.username,passward:req.body.passward}).then(function(){
        res.render("secrets");
    })
})



app.listen(3000,function(){
    console.log("Server started on port 3000");
})