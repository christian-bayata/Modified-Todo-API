const uuid = require("uuid");
const express = require('express');
const {members} = require('./Members');
const router = express.Router();
const mongoose = express("mongoose");
//Gets all members
router.get('/', (req, res) => {
    res.send(JSON.stringify(members, undefined, 2));
})

//Set up the mongoose connection


//Get a single member by the id
router.get("/:id", (req, res) => {
    var memberID = req.params.id;
    //Check if the id exists using the some() method
    const checkID = members.some((member) => member.id === parseInt(memberID));
    if(checkID) {
        res.send(members.filter((member) => member.id === parseInt(memberID)))
    } else {
        res.status(404).json({msg: `ID number ${memberID} not found`})
    }
});

//Create a new user by making a post request
router.post("/", (req, res) => {
    var newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }
    //Ensure that ther user always inputs name and email
    if(!newUser.name || !newUser.email) {
       return res.status(400).json({msg: "Ensure you provide your name and email"});
    }
    //Push in the new name into the members array
        members.push(newUser)
        res.send(members)    
});

router.put("/:id", (req, res) => {
    var checkID = members.some(member => member.id === parseInt(req.params.id))
    if(checkID) {
        var updateMember = req.body;
        members.forEach((member) => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;   
                
            res.json({ msg: "Member updated", member })
        }
    })
    }
    else {
            res.status(400).json({ msg: ""})
    }
})

module.exports = router;