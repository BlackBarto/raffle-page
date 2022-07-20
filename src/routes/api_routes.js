import { Router } from "express";
import { isValidRaffleNumber, getAllContestants } from "../database.js";
import { validNumer } from "../helpers/helpers.js";
const routes = Router()

routes.get("/api/getAllNumbers", async (req, res) => {
    const contestants = await getAllContestants().catch(err => console.log(err))
    const numbers = contestants.map(({raffleNumber}) => raffleNumber)
    res.json(numbers)
})

routes.post("/api/findNumbers", (req, res) => {
    const numberFind = req.body.value
    const isValidNumber = validNumer(numberFind)

    if (isValidNumber) {
        isValidRaffleNumber(numberFind)
            .then(isValid => {
                res.json({isValid, isValidNumber, number: numberFind})
            })
            .catch(err => {
                console.log(err)
                res.json({isValid: false, isValidNumber, number: null})
            })
    } else res.json({isValid: false, isValidNumber})
})

export default routes
