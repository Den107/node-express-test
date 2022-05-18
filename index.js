const express = require('express')
const exphb = require('express-handlebars')
const homeRoutes= require('./routes/home.js')
const coursesRoutes= require('./routes/courses.js')
const addRoutes= require('./routes/add.js')

const app = express()

const hbs = exphb.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/',homeRoutes)
app.use('/courses',coursesRoutes)
app.use('/add',addRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is start on port ${PORT}`)
})