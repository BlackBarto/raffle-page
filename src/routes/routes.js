import { Router } from "express";
import { getAllContestant } from "../database.js";
const routes = Router()

routes.get("/api/getNumbers", async (req, res) => {
    const contestants = await getAllContestant()
    const numbers = contestants.map( ({raffleNumber}) => raffleNumber)

    res.json(numbers)
})

export default routes
