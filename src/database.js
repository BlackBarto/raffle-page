import mongoose from "mongoose"
import { MONGO_URI } from "./config.js"
// import { Contestant } from "./models/models.js"

mongoose.connect(MONGO_URI)

console.log("Database is connected")
