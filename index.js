require("dotenv").config();
const express = require("express");
const  mongoose = require("mongoose");
const cors = require("cors");
var morgan = require('morgan')
const app = express();
app.use(morgan('tiny'));
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const db_url = process.env.url;
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const theatreRoutes = require("./routes/theatre");
const bookingRoutes = require("./routes/reservation");
//database connection
const connection = mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
},(error)=>{
    if(error) {
        console.log(error);
    }else{
        console.log("db connection successful");
    }     
});
app.use(cors());
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/theatre", theatreRoutes);
app.use("/booking", bookingRoutes);
app.get("/",(req,res)=>{
    res.json({"message":"welcome to caw studio movie ticket booking app!"})
})
app.listen(port,()=>{
    console.log(`listening on port: http://localhost:${port}`)   
})