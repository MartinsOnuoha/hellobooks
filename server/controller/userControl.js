import Sequelize from 'sequelize';
import model from '../models';
import jwt from 'jsonwebtoken';


require('dotenv').config();
const secret = process.env.SECRET;
const userModel = model.users;
const borrowedBooksModel = model.books;

export default {

    signin (req, res) {
        userModel.findOne({ where:
            {email: req.body.email,
                password: req.body.password}
        }).then((user) => {
            if(!user) {
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

};