import Sequelize from "sequelize";
import model from "../models";


const userModel = model.users;
const borrowedBooksModel = model.books;

/**
 *@class User
 *@classdesc Creates a new User in the Database
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
        // Create new userModel with request from user
        userModel.create(req.body).then(() => {

            res.
                status(201).json({"message": "SignUp Successful"});

        }).
            catch((error) => {

                if (error.name === "SequelizeUniqueConstraintError") {

                    res.status(400).json({

                        "message": "Sorry, this email address is registered"});

                } else if (error === Sequelize.ValidationError) {

                    res.status(400).json(
                        {"message": "An Error Occurred, Check Signup details"});

                } else {

                    res.status(400).json(
                        {"message": "Oops! an Error Occurred."});

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
            res.status(201).json({"message": "New Book added to shelf"});
        }).
            catch((error) => {

                res.status(400).json({"message": error.message});

            });

    }

}


export default User;
