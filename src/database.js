import mongoose from "mongoose"
import { MONGO_URI } from "./config.js"
import Contestant from "./models/models.js"

export const client = await mongoose.connect(MONGO_URI).then(m => m.connection.getClient())

export const addContestant = async ({name, email, raffleNumber}) => {
    const oldContestand = await Contestant.findOne({raffleNumber: raffleNumber}).exec()
    if (oldContestand) {
	return {ok: false, error: "Currently there is a contestant with that raffle number, try again with another number"}
    } else {
        const contestant = new Contestant({name, email, raffleNumber})
        await contestant.save().catch(err => console.log({name: "addContestant, on save contestant", err}))
	return {ok: true, error: null}
    }
}

export const isValidRaffleNumber = number => {
    return Contestant.findOne({ raffleNumber: parseInt(number)})
        .then(contestant => {
            if (contestant) return false
            return true
        })
        .catch(err => {
            console.log(err)
        })
}

export const findContestant = async (raffleNumber) => {
    const contestant = Contestant.findOne({raffleNumber: raffleNumber})
}

export const getAllContestants = async () => {
    const contestants = await Contestant.find().exec()
    return contestants
}

console.log("Database is connected")
