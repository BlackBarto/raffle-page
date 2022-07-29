import express from "express"
import { addContestant } from "../database.js"
import { isSameDomain, validData } from "../helpers/helpers.js";
import { randomUUID } from"crypto";
const routes = express.Router()
const tokens = new Map()

routes.get("/", async (req, res) => {
    req.session.number = null
    res.render("index", {
	    title: "Raffle of Year",
    })
})

routes.get("/registerANumber", (req, res) => {
    const number = req.session.number
    if (!number) {
        req.flash("messages", {text: "To go there, you must choose an raffle number", class: "error"})
        res.redirect("/")
        return
    }

    const token = randomUUID()
    tokens.set(token, number)
    setTimeout(() => {
        if (tokens.has(token)) {
            tokens.delete(token)
        }
    }, 1000 * 60 * 30)
	res.render("register_raffle_number", {
	    title: "Register your raffle number",
        number,
        token
    })
})

routes.post("/registerANumber", isSameDomain, (req, res) => {
    const { token, number, name, email } = req.body

    if (!token || !number || isNaN(number) || !tokens.has(token) || tokens.get(token) !== parseInt(number)) {
        req.flash("messages", { text: "You waited too much to register your raffle number, try again", class:"error" })
        res.redirect("/")
        return
    }
    tokens.delete(token)

    const { isValid, errors } = validData({name, email})
    if (!isValid) {
        const arrErrors = errors.map(error => {
            return {text: error, class: "error"}
        })
        req.flash("messages", arrErrors)
        res.redirect("/registerANumber")
        return
    }

	addContestant({name, email, raffleNumber: number})
	  .then( ({ok, error}) => {
          if (!ok) {
            req.flash("messages", {text: error, class: "error"})
            res.redirect("/")
            return
          }
          req.flash("messages", {text: `Registration of ${number} fulfilled`, class: "message"})
          res.redirect("/")
          return
      })
      .catch( err => {
          console.log({name: "Error on addContestant, in pages_routes.js", err})
      })
})

export default routes
