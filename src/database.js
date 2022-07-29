import mongoose from "mongoose"
import { MONGO_URI } from "./config.js"
import Contestant from "./models/models.js"

export const client = await mongoose.connect(MONGO_URI).then(m => {
    return m.connection.getClient()
})

export const addContestant = async ({name, email, raffleNumber}) => {
    const oldContestand = await Contestant.findOne({raffleNumber: raffleNumber}).exec()
    if (oldContestand) {
	    return {ok: false, error: "Currently there is a contestant with that raffle number, try again with another number"}
    }

    const contestant = new Contestant({name, email, raffleNumber})
    await contestant.save().catch(err => console.log({name: "addContestant, on save contestant", err}))

	return {ok: true, error: null}
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

export const findContestantByRaffleNumber = async (raffleNumber) => {
    const contestant = await Contestant.findOne({raffleNumber: raffleNumber}).exec()

    return contestant
}

export const getAllContestants = async () => {
    return Contestant.find()
             .then( contestants => {
                 return contestants
             })
             .catch( err => console.log(err))
}

console.log("Database is connected")
