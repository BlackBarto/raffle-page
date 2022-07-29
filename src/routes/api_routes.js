import { Router } from "express";
import { isValidRaffleNumber, getAllContestants } from "../database.js";
import { validNumer, isSameDomain } from "../helpers/helpers.js";
const routes = Router()

routes.get("/api/getAllNumbers", async (req, res) => {
    const contestants = await getAllContestants().catch(err => console.log(err))
    const numbers = contestants.map(({raffleNumber}) => raffleNumber)
    res.json(numbers)
})

routes.post("/api/chooseANumber", isSameDomain, async (req, res) => {
    const numberToChoose = req.body.number

    const { errors, isValidNumber } = validNumer(numberToChoose)
    if (!isValidNumber) return res.json({ok: false, errors, url: ""})

    const isValid = await isValidRaffleNumber(parseInt(numberToChoose))
    if (!isValid) return res.json({ok: false, errors: ["This number is alredy choosen by another contestant, try again with another number"], url: ""})

    const numberToRegister = parseInt(numberToChoose)
    req.session.number = numberToRegister
    res.json({ok: true, errors: [], url: "/registerANumber"})
})

export default routes
