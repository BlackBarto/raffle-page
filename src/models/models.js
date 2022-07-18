import mongoose from "mongoose"
const { Schema, model } = mongoose

const contestantSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    raffleNumber: {type: Number, required: true}
})

const Contestant = model("Contestant", contestantSchema)

export default Contestant