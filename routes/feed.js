import { Router } from "express";
const route = Router()

/* 
    description string
    userId string
    date Date
*/
route.post("/feed", (req,res) => {
    
})

route.get("/feed", (req,res) => {
    console.log(true);
    res.send("hello world")
})

route.put("/feed", (req,res) => {

})

route.delete("/feed", (req,res) => {

})

export default route