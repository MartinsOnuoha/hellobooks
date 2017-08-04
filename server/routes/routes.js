import UserController from "../controller/UserController";
import express from "express";


const Router = express.Router();


// Home route
Router.get("/", (req, res) => {

    res.send("Welcome to Hello Books");

});

// Library
Router.get("/user", (req, res) => {

    res.status(200).send("You are in the library.");

});
// User signup
Router.post('/user/signup', UserController.signup);
Router.post("/users/signin", (req, res) => {


    res.send(req.body);

});


// Books


Router.route("/books").
    get((req, res) => {
        // Books in library
        res.send("All Books in Library"); 

    }).
    post((req, res) => {
        // Add new book
        res.send("New book added"); 

    });

Router.route("/users/:userId/books").
    post((req, res) => {
        // Borrow book
        res.send("new book borrowed"); 

    }).
    get((req, res) => {

        if (req.query.returned === "false") {

            return res.send([
                "book1",
                "book2"
            ]);

        }
        res.send([
            "book1",
            "book2",
            "book3"
        ]);

    }).
    put((req, res) => {
        // Return book
        res.send("book returned");

    });

// Modify books
Router.put("/books/:bookId", (req, res) => {

    res.send(req.body);

});


export default Router;