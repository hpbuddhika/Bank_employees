const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const expressValidator= require("express-validator");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");



//app
const app = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true   
})
.then(()=>console.log("DB Connected"));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator()); 

//routes middleware
app.use("/api",authRoutes);
app.use("/api",userRoutes);

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`server is runing on ${port}`);
})

