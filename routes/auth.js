import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { CONSTANTS } from "../config/constants.js";
import auth from "../models/auth.js";

const route = Router()

route.post("/login", async (req,res) => {
    const { username, password } = req.body

    const userName = username || ""
    const passWord = password || ""
    
    if (username.lenght <= 16) {
        res.status(400).send("username should be less than 16 character")
        return
    }

    if (password.lenght <= 32) {
        res.status(400).send("password should be less than 16 character")
        return
    }

    const isExist = await auth.findOne({ username: userName }).exec()

    if(!isExist) {
        res.status(401).send("this username could not be found in the database")
        return
    }

    const isMatch = await bcrypt.compare(passWord, isExist.password)

    if(!isMatch) {
        res.status(401).send("username or password is invalid")
        return
    }

    const AUTH_TOKEN = jwt.sign({username: isExist.username, _id: isExist.id}, CONSTANTS.SIGN_TOKEN, {
        expiresIn: '7d'
    })

    res.status(200).send(AUTH_TOKEN)
})

route.post("/register", async (req,res) => {
    const { username, password } = req.body

    const userName = username || ""
    const passWord = password || ""

    if (username.lenght <= 16) {
        res.status(400).send("username should be less than 16 character")
        return
    }

    if (password.lenght <= 32) {
        res.status(400).send("password should be less than 16 character")
        return
    }

    const account = {
        username: userName,
        password: await bcrypt.hash(passWord, 12),
        date: Date.now()
    }

    const isExist = await auth.findOne({ username: userName }).exec()

    if (isExist) {
        res.status(409).send("this username is already taken")
        return
    }

    new auth(account).save()
    
    res.status(200).send("register successfully")
})

export default route