const express =require("express");
const cors = require('cors')
const mongoose =require("mongoose")
const {PORT,DB} = require("./config")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true,
})
.then(res=>{
    console.log("Connected to Db")
})
.catch(err=>{
    console.log("Error connecting to Db")
})


app.use("/api/v1/user",require("./routes/User/Auth"))
app.use("/api/v1/",require("./routes/investmentPlan/investment"))
app.use("/api/v1/",require("./routes/investmentPlan/Transfer/Transfer"))
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})