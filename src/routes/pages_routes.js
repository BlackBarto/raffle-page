import express from "express"
import { addContestant } from "../database.js"
import { isSameDomain, validData } from "../helpers/helpers.js";
import { randomUUID } from"crypto";
const routes = express.Router()
const tokens = new Map()

routes.get("/", async (req, res) => {
    if (req.session.number) req.session.number = null
    res.render("index", {
	title: "Raffle of Year"
    })
})

routes.get("/registerANumber", (req, res) => {
    const number = req.session.number
    if (number) {
        const token = randomUUID()
        tokens.set(token, number)
        setTimeout(() => {
            if (tokens.has(token)) {
                tokens.delete(token)
            }
        }, 1000 * 60 * 5)
	res.render("register_raffle_number", {
	    title: "Register your raffle number",
            number,
            token
        })
    } else {
        req.flash("errors", "To go there, you must choose an raffle number")
        res.redirect("/")
    }
})

routes.post("/registerANumber", isSameDomain, (req, res) => {
    const { token, number, name, email } = req.body
    if (token && number && !isNaN(number) && tokens.has(token) && tokens.get(token) === parseInt(number)) {
        tokens.delete(number)
        const { isValid, errors } = validData({name, email})
        if (isValid) {
	    addContestant({name, email, raffleNumber: number})
	      .then( ({ok, err}) => {
 		if (ok) {
                    res.redirect("/")
	 	} else {
		    req.flash("errors", err)
                    res.redirect("/")
  		}
    	      })
        }
    } else {
        req.flash("errors", "You waited too much to register your raffle number, try again")
        res.redirect("/")
    }
})

export default routes
