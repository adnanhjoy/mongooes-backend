const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const signupController = async (req, res) => {
    try {
        const password = req.body.password;
        const securePassword = await bcrypt.hash(password, 10);
        const user = User({
            ...req.body,
            password: securePassword
        });
        const result = await user.save();
        res.status(200).json({
            success: true,
            message: "Signup Successfull",
            data: result
        })
    } catch (error) {
        res.status(5000).json({ message: error.message })
    }
}


// login

const loginController = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req?.body?.password, user[0]?.password);

            if (isValidPassword) {
                let token = jwt.sign({
                    userId: user[0]._id,
                    username: user[0].username,
                    email: user[0].email,
                }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

                res.status(200).json({
                    "access_token": token,
                    "message": "Login Successfull"
                })
            } else {
                res.status(401).json({
                    message: "Authentication failed"
                })
            }
        } else {
            res.status(401).json({
                message: "Authentication failed"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

module.exports = {
    signupController,
    loginController
}