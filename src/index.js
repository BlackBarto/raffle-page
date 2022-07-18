import express from "express"
import routes from "./routes/routes.js";
import { PORT } from "./config.js"

// Initialize the database
import "./database.js"

// Initialize the server
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Static Files
app.use(express.static("src/public"))

// Routes
app.use(routes)

// Listen the port
app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})
