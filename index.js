const express = require('express')
const path = require("path");
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const exphb = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const homeRoutes = require('./routes/home.js')
const coursesRoutes = require('./routes/courses.js')
const addRoutes = require('./routes/add.js')
const cardRoutes = require('./routes/card.js')
const ordersRoutes = require('./routes/orders.js')
const User = require('./models/user.js')


const app = express()

const hbs = exphb.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next)=>{
    try{
        req.user = await User.findById('6286342aa1f019e3d05d3bfb')
        next()
    }catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)


const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/shop')
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: 'den@mail.com',
                name: 'Den',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is start on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

