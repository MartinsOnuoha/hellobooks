import Sequelize from 'sequelize';
import model from '../models';
import jwt from 'jsonwebtoken';


require('dotenv').config();
const secret = process.env.SECRET;
const userModel = model.users;
const borrowedBooksModel = model.books;

/**
 *@class User
 *@classdesc Creates a new User in the Database
 */
class User {
    /**
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

    /** *
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
    static signin (req, res) {
        userModel.findOne({ where:
            {email: req.body.email,
                password: req.body.password}
        }).then((user) => {
            if (!user) {
                res.status(400).send('username and password mismatch');
            }
            const token = jwt.sign({
                "id": user.dataValues.id,
                "email": user.dataValues.email,
                "role": user.dataValues.role
            }, secret, {"expiresIn": "24h"});
            res.json({message: "success",
                token: token
            });
        });
    }


    // User Profile

    static profilePage (req, res) {
        if (!req.headers.Authorization) {
            res.status(401).
                json({message: 'Invalid/Expired token'});

        }
    }

    static getUserBooks (req, res) {
        const returnStatus = req.query.returned;
        const query = {};

        if (returnStatus === undefined) {
            query.where = {
                userid: req.body.userid
            };
        } else if (returnStatus === 'false') {
            query.where = {
                $and: [
                    {userid: req.body.userid},
                    {returnstatus: false}
                ]
            };
        } else {
            query.where = {
                $and: [
                    {userid: req.body.userid},
                    {returnstatus: true}
                ]
            };
        }

        borrowedBooksModel.findAll(query).
            then((response) => {
                res.status(200).json({books: response});
            }).catch((error) => {
                res.status(404).json({message: error});
            });
    }

    /**
   * @param { object } req
   * @param { object } res
   * @returns { void }
   */
    static booksReturned(req, res) {
        const returnStatus = req.query.returned;
        borrowedBooksModel.findAll({
            where: {returnstatus: returnStatus}}).then((response) => {
            if (response.length === 0) {
                res.status(200).json({
                    message: 'You have not returned any book'
                });
            } else {
                res.status(200).json({returned: response});
            }
        }).
            catch((error) => {
                res.status(404).json({message: error});
            });
    }


}


export default User;
