import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CONSTANTS } from "../config/constants.js";
import auth from "../models/auth.js";

const route = Router()

route.post("/login", async (req,res) => {
    const { username, password } = req.body
    
    if (username?.lenght <= 32) {
        res.status(400).send("username should be less than 32 character")
        return
    }

    if (password?.lenght <= 256) {
        res.status(400).send("password should be less than 256 character")
        return
    }

    const user = await auth.findOne({ username: username }).exec()

    if(!user) {
        res.status(400).send("username or password is invalid")
        return
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        res.status(400).send("username or password is invalid")
        return
    }

    const authtoken = jwt.sign({username: isExist.username, _id: isExist.id}, CONSTANTS.SIGN_TOKEN, {
        expiresIn: '7d'
    })

    res.status(200).send(authtoken)
})

route.post("/register", async (req,res) => {
    const { username, password } = req.body

    if (!username && !password) {
        res.status(400).send("username and password is argument")
        return
    }
    
    const account = {
        username: username,
        password: await bcrypt.hash(passWord, 12),
        date: Date.now()
    }

    const user = await auth.findOne({ username: username }).exec()

    if (user) {
        res.status(409).send("this username is already taken")
        return
    }

    new auth(account).save()
    
    res.status(200).send("register successfully")
})

export default route