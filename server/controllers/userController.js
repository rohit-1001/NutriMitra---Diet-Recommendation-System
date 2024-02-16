const express = require('express');
const router = express.Router();
const User = require('../models/user');
const brycpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please fill the required fields" });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const user = new User({ name, email, password });
        await user.save();
        return res.status(200).json({ msg: "Registration successful" });
    } catch (error) {
        return res.status(500).json({ error: "Some error occured" });
    }
}

const signin = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the required fields" });
        }
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await brycpt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
            else{
                const token = await user.generateAuthToken();
                let role = user.role;
                if(role === null){
                    role = "notset"
                }
                return res.status(200).json({ msg: "Login successful",token: token , role: role});
            }
        }
        else{
            return res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Some error occured" });
    }
}

module.exports = { signup, signin };