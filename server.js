const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const blogRoute = require('./route/blog');
const authRoute = require('./route/auth');

const app = express();

// connect cloud database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=> console.log(`Cloud server status: >>Connected!!<<`))
.catch((err)=>console.log(`Error Can't connect to server`))

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//route
app.use('/api', blogRoute);
app.use('/api', authRoute);

//Port confiq
const port = process.env.PORT || 8080
app.listen(port, ()=>console.log(`Start server in port ${port}`));

