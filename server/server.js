const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const Loan  = require("./Data")
const path= require('path')

if(process.env.NODE_ENV !=="PRODUCTION"){
  require("dotenv").config({ path: "./.env" });
}
/*********************************************************** */

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

/*********************************************************** */

const app = express();
const router = express.Router();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

/******************************************** */
// CONNECTING TO MONGO DATABASE AT ATLAS
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) =>
    console.log("MONGO DB CONNECTED WITH SERVER ", data.connection.host)
  )
  .catch((e) => {
    console.log(e.message);
    server.close(()=>{
      process.exit(1);
    })
  });

  router.post("/api/save",async(req,res,next)=>{
    try {
      const {personalDetails,bussinessDetails,loanDetails} = req.body;
      await Loan.create({
        personalDetails,
        bussinessDetails,
        loanDetails
      })     
      res.status(200).json({ok:true});  
    } catch (error) {
      console.log(error)
      res.status(500).json({ok:true,message:"Internal server error"});  
      
    }
  })

  app.use(router)

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname,"../client/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
})
/*********************************************************** */
process.on("unhandledRejection", (err) => {
  console.log(`Error:`, err);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});


module.exports = app;
