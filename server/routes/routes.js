import Auth from "../middleware/authUser";
import BookController from "../controller/booksController";
import UserController from "../controller/UserController";
import express from "express";
import helper from '../helpers/helper';
// Import UserControl from "../controller/userControl";


const router = express.Router();

// Home route
router.get("/", (req, res) => {
    res.status(200).send("Welcome to Hello Books");

});

// Create a new User
router.post("/users/signup", UserController.signup);

// Sign in Existing User
router.post("/users/signin", UserController.signin);

// Get Users (Admin)
router.get("/users", Auth.verifyAdmin, UserController.getAllUsers);


// Books Routes
router.route("/books").
    get(BookController.getBook).
    post(Auth.verifyAdmin, BookController.addBook).
    delete(Auth.verifyAdmin, BookController.deleteBook);
// Edit a book, Only admins allowed
router.put('/books/:id', Auth.verifyAdmin, BookController.modifyBook);

// Allow User borrow books
router.route("/users/:userId/books").
    post(Auth.verifyUser,
        helper.checkBook, helper.verify, UserController.borrowBook).
    get(Auth.verifyUser, UserController.getUserBooks).
    put(Auth.verifyUser, BookController.returnBook);

// User Profile
router.get('/users/:userId/', Auth.verifyUser, UserController.profilePage);

// 404 routes
router.route("*").
    post((req, res) => {

        res.send("404, Page not Found.");

    }).
    get((req, res) => {

        res.send("404, Page not Found.");

    });

export default router;
