import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CONSTANTS } from "../config/constants.js";
import auth from "../models/auth.js";

const route = Router()

route.post("/login", async (req,res) => {
    const { username, password } = req.body
    
    const maxUsernameLimit = 32

    if (username.length <= maxUsernameLimit) {
        res.status(400).send("username should be less than 32 character")
        return
    }

    const maxPassLimit = 256

    if (password.length <= maxPassLimit) {
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

    const authtoken = jwt.sign({username: user.username, _id: user.id}, CONSTANTS.SIGN_TOKEN, {
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

    const user = await auth.findOne({ username: username }).exec()

    if (user) {
        res.status(409).send("this username is already taken")
        return
    }
    
    const salt = 12

    const account = {
        username: username,
        password: await bcrypt.hash(password, salt),
        date: Date.now()
    }

    const newUser = new auth(account).save()
    
    const authtoken = jwt.sign({username: newUser.username, _id: newUser.id}, CONSTANTS.SIGN_TOKEN, {
        expiresIn: '7d'
    })

    res.status(200).send(authtoken)
})

export default route