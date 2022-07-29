import express from "express"
import compression from 'compression'
import session from "express-session"
import flash from "connect-flash"
import MongoStore from "connect-mongo"
import { join } from "path"
import routes from "./routes/pages_routes.js";
import apiRoutes from "./routes/api_routes.js";
import { PORT, SECRET_WORD } from "./config.js"

// Initialize the database
import { client } from "./database.js"

// Initialize the server
const app = express()

// Configure the compression middleware
app.use(compression())

// Configure the view engine (ejs)
app.set("views", join("src", "views"))
app.set("view engine", "ejs")

// Middleware modules
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: SECRET_WORD,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
app.use(flash())

// Expires headers (middleware)
app.use( (req, res, next) => {
    if (req.url.includes("/css") || req.url.includes("/imgs") || req.url.includes("/fonts") || req.url.includes("/js") ) {
        res.append("Cache-Control", "public, max-age=172800000")
        res.append("Expires", new Date(Date.now() + 172800000).toUTCString())
    }
    next()
})

app.use((req, res, next) => {
    res.locals.messages = req.flash("messages")
    next()
})

// Static Files
app.use(express.static("src/public"))

// Routes
app.use(routes)
app.use(apiRoutes)

// Listen the port
app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`)
})
