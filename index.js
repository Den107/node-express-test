const express = require('express')
const path = require("path");
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const exphb = require('express-handlebars')
const  { allowInsecurePrototypeAccess }  =  require ( '@handlebars/allow-prototype-access' )
const homeRoutes = require('./routes/home.js')
const coursesRoutes = require('./routes/courses.js')
const addRoutes = require('./routes/add.js')
const cardRoutes = require('./routes/card.js')


const app = express()

const hbs = exphb.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)


const PORT = process.env.PORT || 3000

async function start() {
    await mongoose.connect('mongodb://localhost:27017/shop')
    try {
        app.listen(PORT, () => {
            console.log(`Server is start on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

