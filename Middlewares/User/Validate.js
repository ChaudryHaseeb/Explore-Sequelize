const db = require('./../../db/models');
const {body, validationResult} = require('express-validator');
const {Op, where} = require("sequelize");
const User=db.User;

exports.userCreateRequest = [
    body('password')
        .isLength({min: 6})
        .custom((value, {req, loc, path}) => {
            if (value !== req.body.confirm_password) {
                throw new Error("Confirm password do not match");
            } else {
                return value;
            }
        }),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address.'),
    body('username')
        .not().isEmpty().trim().escape()
        .withMessage('Invalid username.'),
    // body('role_id')
    //     .not().isEmpty()
    //     .withMessage('Role is not selected'),
    // body('name')
    //     .not().isEmpty().trim().escape()
    //     .withMessage('Enter a valid name'),

    async (req, res, next) => {
        const errors = validationResult(req);
        const {username , email} = req.body;
        const oldUser = await User.findOne({
            where: {
                username: username
            }
        });
        if (oldUser) {
            errors.errors.push({
                msg: 'Another user already registered with username, Try another one',
                path: 'username',
                location: 'body'
            });
        }
        const existing = await User.findOne({
            where:{
                email : email
            }
        });
        if (existing) {
            errors.errors.push({
                msg: "Another user already register with this email, Try another one",
                path: 'email',
                location: 'body'
            });
        }
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        else
            next();

    },
]

