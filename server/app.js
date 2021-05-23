const express = require("express");
const fs = require("file-system");
const path = require("path");
const {mongoose} = require('./db/mongoose');
const { Todo } = require("./models/todos");
const { User } = require("./models/users")
const {ObjectID} = require("mongodb");
const isvalid = require('isvalid');

var app = express();

var PORT = process.env.PORT || 3000;
//Initialize middleware
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/api/members", require("./api/mem-api"));

//Body Parser init
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// //Create a new user
// app.post("/users", (req, res) => {
//     var user = new User({
//         name: req.body.name,
//         email: req.body.email
//     })

//     if(!user.name || !user.email) {
//        return res.status(400).json({ msg: "Provide your name and email always"})
//     }

//     user.save().then((doc) => {
//         res.send("User posted", doc)
//     }, (err) => {
//         res.status(400).send(err);
//     }).catch((e) => res.send(e));
// })

app.post("/todos", (req, res) => {
    //create a new todo
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    }).catch((e) => res.send(e))
})

//Get a single todo by its ID
app.get("/todos/:id", (req, res) => {
    
    var id = req.params.id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
    if(!todo) {
       res.status(400).send()
    } else {
        res.json(todo)
    }
    }, (err) => {
        res.status(400).send(e);
    }).catch((e) => res.status(400).send(e))
});
//Get all todos in the database
app.get("/todos", (req, res) => {
    Todo.find({}).then((todo) => {
        res.json({todo})
    }, (err) => {
        res.status(400).json({msg: "Invalid requests"});
    }).catch((e) => res.send(e))
});

//Get a single user by ID
app.get("/users/:id", (req, res) => {
    
    var id = req.params.id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findById(id).then((user) => {
    if(!user) {
       res.status(400).send()
    } else {
        res.json(user);
    }
    }, (err) => {
        res.status(400).send(e);
    }).catch((e) => res.status(400).send(e))
});

//Update a user information on database

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

