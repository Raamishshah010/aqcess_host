const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require('./db/mongo').connect()
require("dotenv").config()

//! MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//! ROUTES
const adminRouter = require('./router/admin.routes')
const userRouter = require('./router/user.routes')


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the aqcess api'
    })
})


//! ROUTERS

app.use('/admin', adminRouter)
app.use('/user', userRouter)



app.listen('3000', () => {
    console.log('listening on http://localhost:3000');
})