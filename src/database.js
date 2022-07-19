import mongoose from "mongoose"
import { MONGO_URI } from "./config.js"
import Contestant from "./models/models.js"

mongoose.connect(MONGO_URI)

export const addContestant = ({name, email, raffleNumber}) => {
    const contestant = new Contestant({name, email, raffleNumber})
    return contestant.save()
}

export const isValidRaffleNumber = (number) => {
    return Contestant.findOne({ raffleNumber: number})
        .then(contestant => {
            if (contestant) return false
            return true
        })
        .catch(err => {
            console.log(err)
        })
}


export const getAllContestants = async () => {
    return await Contestant.find()
}

console.log("Database is connected")
