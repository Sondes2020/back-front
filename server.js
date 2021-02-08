// require express
const express=require("express");

1// require connectDB
const connectDB=require("./config/connectDB");
// require router
const authRouter=require("./routes/auth")
//connectDB
connectDB();
2//init express
const app=express();
//middlleware
app.use(express.json());
// use router
app.use('/api/auth', authRouter);

3// create port
const port = process.env.PORT || 5000;
4// lunch server
app.listen(port, (error)=> error
? console.log(error)
:console.log(`The server is running on port ${port}`)
);
