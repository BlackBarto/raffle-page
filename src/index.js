import express from "express"
import { PORT } from "./config.js"
import "./database.js"

// Initialize the server
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Listen the port
app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})
