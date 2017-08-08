import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import model from "../models";

require("dotenv").config();
const userModel = model.users;

const secret = process.env.SECRET;

/**
 * @class Authentication class
 * @classdesc creates an authentication class
 */

class Authentication {

    static signin (req, res) {

        userModel.findOne({"where": {"email": req.body.email}}).
            then((user) => {

                if (user && bcrypt.compare(req.
                    body.password, user.dataValues.password)) {

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

                    res.status(200).send(response);

                } else {

                    res.status(404).send({"message": "User does not exist"});

                }

            }).
            catch((err) => res.send(err));

    }

}

export default Authentication;