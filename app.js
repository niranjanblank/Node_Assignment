const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const categoryRouter = require('./routers/categoryRouter')
const companyRouter = require('./routers/companyRouter')



const app = express()
app.use(express.json())
app.use('/images',express.static('images'))
// getting the values from env file
const db = process.env.DB_LOCATION
const port = process.env.PORT

// routes
    // For category
app.use('/api/category',categoryRouter)
    // For company
app.use('/api/company',companyRouter)


// connecting to router
mongoose.connect(db, {useNewUrlParser: true})
.then(
    console.log('DB Connected')
).catch(err => console.log(err))

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})