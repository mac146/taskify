const express=require('express')
const jwt=require('jsonwebtoken')
const Jwt_SECRET="macc1234";

function authmiddleware(req,res,next){
    const token=req.headers.token;
    try{
    const decoded = jwt.verify(token, Jwt_SECRET);
    if(decoded.id){
        req.id=decoded.id
    next();
    }
    else{
    res.status(403).json({ message: "Invalid token" });
    }
    }catch(e){
        res.status(403).json({message:"invalid token"})
    }
}
module.exports = authmiddleware;