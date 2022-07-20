import express from "express"
import { join } from "path"
import routes from "./routes/pages_routes.js";
import apiRoutes from "./routes/api_routes.js";
import { PORT } from "./config.js"

// Initialize the database
import "./database.js"

// Initialize the server
const app = express()

// Configure the view engine (ejs)
app.set("views", "src/views")
app.set("view engine", "ejs")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Static Files
app.use(express.static("src/public"))

// Routes
app.use(routes)
app.use(apiRoutes)

// Listen the port
app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})
