const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require("./config/db")
const path = require('path')

dotenv.config();

//mongodb connection
connectDB();
// const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_URL).then(()=>{
//     console.log("db")
// })

// rest object
const app = express();

// middleware 
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
// routes
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Static Folder
app.use(express.static(path.join(__dirname,'./client/build')));

// Static Routes
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port
const PORT = process.env.PORT || 8080;


// listen
app.listen(PORT , ()=> {
    console.log(
        `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}`
          .bgBlue.white
      );
});