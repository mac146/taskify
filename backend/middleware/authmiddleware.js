const express = require('express');
const jwt = require('jsonwebtoken');
const Jwt_SECRET = "macc1234";

function authmiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, Jwt_SECRET);
        req.id = decoded.id;
        next();
    } catch (e) {
        res.status(403).json({ message: "invalid token" });
    }
}

module.exports = authmiddleware;
