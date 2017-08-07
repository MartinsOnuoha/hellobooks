import Auth from "../middleware/authUser";
import BookController from "../controller/booksController";
import UserController from "../controller/UserController";
import express from "express";


const router = express.Router();


// Home route
router.get("/", (req, res) => {

    res.status(200).send("Welcome to Hello Books");

});

// User signup
router.post("/users/signup", UserController.signup);
router.post("/users/signin", Auth.signin);
router.get("/users/", UserController.)

// Books Routes

router.route("/books").
    get(BookController.addBook).
    post(BookController.addBook);


router.route("/users/:userId/books").
    post(UserController.Books).
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

        res.send("Book Returned!");

    });

// Admin modify books
router.put("/books/:bookId", (req, res) => {

    res.send(req.body);

});

// 404 routes
router.route("*").
    post((req, res) => {

        res.send("Sorry, Page not Found.");

    }).
    get((req, res) => {

        res.send("Sorry, Page not Found.");

    });

export default router;