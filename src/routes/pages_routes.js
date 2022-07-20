import express from "express"
import {getAllContestants} from "../database.js"
import { isSameDomain } from "../helpers/helpers.js"
const routes = express.Router()

routes.get("/", async (req, res) => {
    res.render("index", {
	title: "Raffle of Year"
    })
})

export default routes
