const express = require('express');
//const { PAGLOCK } = require('sequelize/types/table-hints');
const router = express.Router();
const bcrypt = require("bcrypt");
const{Users}=require ("../models")
const{sign}= require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');


router.post("/", async(req,res)=>{
   const {username, password}=req.body;
   bcrypt.hash(password,10).then((hash)=>{
       Users.create({username:username,
    password: hash,})
   res.json("success..");
});


});
router.post("/login",async (req,res)=>{
    const {username, password}=req.body;
    const user = await Users.findOne({where:{username:username}})
if (!user) res.json ({error: "user doesnt exist.."});
bcrypt.compare(password,user.password).then((match)=>{
    if (!match)res.json({error: "Wrong username and password combination.."})
    const accessToken = sign({username:user.username,id:user.id}, "important"
    );
        res.json({token:accessToken, username: username,id: user.id});
}
)

}) 
router.get("/auth",validateToken,(req,res)=>{
    res.json(req.user);
});
module.exports=router
