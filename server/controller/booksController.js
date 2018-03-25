import model from "../models";

const bookModel = model.books,
    borrowedBooks = model.borrowedbooks;

/**
 * @class Book
 * @classdesc creates Book classs and methods
 */
class Book {

/**
   * @param {Object} req
   * @param {Object} res
   * @return null
   */
    // Add New Book
    static addBook (req, res) {
        bookModel.create(req.body).then((book) => {
            res.sendStatus(201).json({"message": `${book}`});
        }).
            catch((error) => {
            // Check if all fields are supplied.
                if (error.name === "SequelizeValidationError") {
                    res.sendStatus(400).
                        json({"message": "One or more fields are empty"});

                // Check if a duplicate request was made.
                } else if (error.name === "SequelizeUniqueConstraintError") {
                    res.status(409).
                        json({
                            "message": "Similar ISBN number"
                        });
                } else {
                    res.send({'message': 'Oops, An Error Occurred.'});

                }
            });

    }


    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {void}
     */

    static deleteBook (req, res) {
        bookModel.destroy({"where": {"id": req.body.id}}).
            then((book) => {
                res.status(200).json({
                    "message": 'Book Deleted successfully',
                    "data": book
                });
            }).
            catch((error) => {
                if (error) {
                    throw error;
                }
                res.status(500).json({
                    "message": 'Sorry, Book cannot be deleted'
                });
            });
    }

    // Get books
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     */

    static getBook (req, res) {
        bookModel.findAll().then((response) => {
            res.send(response);
        }).
            catch((error) => {
                res.status(404).
                    json({"message": `Sorry, An Error Occured: ${error}`});
            });

    }

    // Modify Book Content
    /**
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     */

    static modifyBook (req, res) {
        const bookData = {
                "author": req.body.author,
                "date": req.body.date,
                "title": req.body.title,
                "description": req.body.description,
                "quantity": req.body.quantity
            },
            query = {
                "where": {
                    "id": parseInt(req.params.id, 10)
                }
            };

        bookModel.findOne(query).
            then((book) => {
                if (!book) {
                    return res.status(404).send({"msg": 'Book not found'});
                }
                book.update(bookData).
                    then((updated) => {
                        if (updated) {
                            res.status(200).json({
                                "message": 'Book modified successfully',
                                "data": updated
                            });
                        }
                    }).
                    catch((error) => {
                        res.status(404).json({"message": error.body});
                    });

                return book;
            }).
            catch((error) => res.status(500).json({
                "message": `Sorry, An Error occurred: ${error}`
            }));
    }

    // Borrow Book
    /**
     * Add two numbers.
     * @param {object} req .
     * @param {object} res .
     * @returns {object} response.
     */
    static borrowBook (req, res) {
        borrowedBooks.create(req.body).
            then((response) => {
                bookModel.update({"quantity": req.book.dataValues.quantity - 1},
                    {"where": {"id": response.dataValues.bookid}}).
                    then(() => {
                        res.status(201).json({"message": "Book Added",
                            "returnDate": req.body.expectedreturndate
                        });
                    }).
                    catch(() => {
                        res.status(400).json({"message": "Book not added"});
                    }).
                    catch();
            }).
            catch((error) => {
                res.status(401).json({"message": error});
            });
    }

    /**
   * @param { object } req
   * @param { object } res
   * @returns { object } returns object
   */

    // Return Books
    static returnBook (req, res) {
        borrowedBooks.findOne({"where": {
            "userid": req.body.userid,
            "bookid": req.body.bookid,
            "returnstatus": false}}).
            then((response) => {
                if (response === null) {
                    res.status(404).json({
                        "message": "This book is not in your borrow history"
                    });
                } else {
                    borrowedBooks.update({"returnstatus": true},
                        {"where": {"id": response.dataValues.id}}).
                        then(() => {
                            res.status(200).json({
                                "message": 'Book has been returned'
                            });
                        });
                }
            });
    }

}

export default Book;
