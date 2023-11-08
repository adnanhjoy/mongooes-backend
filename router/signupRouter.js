const express = require('express');
const User = require('../schema/signUpSchema');
const bcrypt = require('bcrypt');
const signupRouter = express.Router();

signupRouter.post('/user', async (req, res) => {
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
})

module.exports = signupRouter;