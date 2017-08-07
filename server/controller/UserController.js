import model from "../models";

const userModel = model.users;
const borrowedBooksModel = model.books;

/**
 *@class User
 *@classdesc creates a new user
 */
class User {


    /*
   * @param {Object} req
   * @param {Object} res
   * @return null
   */
    static getAllUsers (req, res) {

        userModel.findAndCountAll().
            then((response) => {

                res.status(200).json(response);

            }).
            catch((err) => {

                res.send(err);

            });

    }
    static signup (req, res) {

        userModel.create(req.body).then(() => {

            res.
                status(201).json({"message": "SignUp Successful"});

        }).
            catch((error) => {

                if (error.name === "SequelizeValidationError") {

                    res.status(400).json({"message": error.message});

                } else {

                    res.json(error);

                }

            });

    }

    /*
     *
     * @param {object} req
     * @param {object} res
     */

    static borrowBook (req, res) {

        borrowedBooksModel.create(req.body).then(() => {

            res.status(201).json({"message": "New Book added to shelf" });

        }).
            catch((error) => {

                res.status(400).json({"message": error.message});

            });

    }

}


export default User;