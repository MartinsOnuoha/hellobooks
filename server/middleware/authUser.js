import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import model from "../models";

require("dotenv").config();

const userModel = model.users;
const secret = process.env.SECRET;

/**
 * @class Authentication class
 * @classdesc verifies user signin
 */

class Authentication {
    /**
   * @param { object } req 
   * @param { object} res 
   * @param { object } next
   * @returns { object } response
   */
    // Verify Admin
    static verifyAdmin(req, res, next) {
        if (!req.headers.authorization) {
            res.status(401).json({message: 'Unauthorized - Access Denied'});
        } else {
            const decoded = jwt.verify(req.headers.authorization, secret);
            if (decoded.role === 'user') {
                res.status(401).json({message: 'Unauthorized - Access Denied'});
            } else {
                next();
            }
        }
    }


    /**
    *@param {object} req
    *@param {object} res
    *@return null
    */
    // Sign in Users

    static signin (req, res) {
        userModel.findOne({
            "where": {
                "email": req.body.email,
                "password": req.body.password
            }
        }).
            then((user) => {

                if (user && req.body.password === user.dataValues.password) {

                    const token = jwt.sign({
                        "id": user.dataValues.id,
                        "email": user.dataValues.email,
                        "membership": user.dataValues.membership,
                        "role": user.dataValues.role
                    }, secret, {"expiresIn": "24h"});

                    const response = {
                        "data": {token},
                        "message": "signed in"
                    };
                    console.log(req.body.password);
                    console.log(user.dataValues.password);
                    res.status(200).send(response);
                } else {
                    res.status(404).send({"message": "User does not exist"});
                }

            }).
            catch((err) => res.send({message: "An Error Occurred"}));

    }

    // Verify User exists
    static verifyUser (req, res, next) {
        if (!req.headers.authorization) {
            res.status(401).json({message: 'Invalid/expired token'});
        } else {
            const decoded = jwt.verify(req.headers.authorization, secret);
            userModel.findOne({ where: {email: decoded.email, id: decoded.id}}).then((user) => {
                if (user) {
                    req.body.userid = decoded.id;
                    req.membership = decoded.membership;
                    next();
                } else {
                    res.status(401).json({message: 'User does not exist'});
                }
            }).
                catch(() => {
                    res.status(401).json({ message: 'Invalid/expired token' });
                });
        }
    }
}


export default Authentication;