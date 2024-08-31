import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/UsersM.js';

const router = express.Router();

// can use async/await notation or promise
router.post("/reg", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username}); // check if user exists
    if(user){
        return res.json({message: "User already exists. Please try again"});
    }
    // hash the password
    const hashPass = await bcrypt.hash(password, 50);

    // add the new user to the database
    const newUser = new UserModel({username, password: hashPass});
    await newUser.save();

    res.json({message: "User successfully registered!"});
});

// must create a token to represent the current login session
router.post("/login", async(req,res) => {
    const {username,password} = req.body;
    const user = await UserModel.find({username});

    if (!user){
        return res.json({message: "User doesn't exist"});
    }
    
    // validate hashed password
    const isPassValid = await bcrypt.compare(password, user.password);
    if(!isPassValid){
        return res.json({message: "Username or Password Is Incorrect!"});
    }

    // generate a token for the session
    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id })
});

export {router as userRouter}