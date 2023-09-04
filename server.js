const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb()
const app = express()

const port = process.env.PORT || 5000;

app.use(express.json())  // it will provide the parser which help to parse the data that we recieve from client

app.use("/api/contacts", require("./routes/contactsRouter"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)




app.listen(port , () =>{
    console.log(`Server is running on ${port}`)
})