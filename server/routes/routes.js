import express from 'express';

const Router = express.Router();


//Home route
Router.get('/', (req,res) => {
    res.send("Welcome to Hello Books");
})

//Library
Router.get('/user', (req, res) => {
    res.status(200).send('You are in the library.');
});

// User signup
Router.post('/users/signup', userController.signup);

Router.post('/users/signin', (req, res) => {
  res.send(req.body);
});


//Books


Router.route('/books')
  .get((req, res) => {
    res.send('All Books in Library'); //books in library
  })
  .post((req, res) => {
    res.send('New book added'); //add new book
  });

Router.route('/users/:userId/books')
  .post((req, res) => {
    res.send('new book borrowed'); //borrow book
  })
  .get((req, res) => {
    if (req.query.returned === 'false') {
      return res.send(['book1', 'book2']);
    }
    res.send(['book1', 'book2', 'book3']);
  })
  .put((req, res) => {
    res.send('book returned'); //return book
  });

//Modify books
Router.put('/books/:bookId', (req, res) => {
  res.send(req.body);
});


export default Router;
