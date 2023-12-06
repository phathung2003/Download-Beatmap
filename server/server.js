require('dotenv').config();

const express = require('express');
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())


const Oauth = require("./Route/OAuth")
const Song = require("./Route/Song")
const Test = require("./Route/Testing")

//lấy token
app.use("/OAuth", Oauth)

//Lấy danh sách bài hát
app.use("/Song", Song)

//Thử nghiệm
app.use("/Testing", Test)

// Khởi động server
app.listen(process.env.PORT, () => {console.log(`Server được khởi động tại port ${process.env.PORT}`);}); 