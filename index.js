const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const ThanhVien = require("./API/ThanhVien.js")
const Quy = require("./API/Quy.js")

mongoose.connect("mongodb+srv://PUsen:11112222@quanlycongdoan.gfktzsl.mongodb.net/QuanLy?retryWrites=true&w=majority&appName=QuanLyCongDoan");

app.use(express.json());
app.use(cors())

const db = mongoose.connection;

db.once('open', () => {
    console.log('Kết nối MongoDB thành công');
});

app.use("/ThanhVien", ThanhVien)
app.use("/Quy", Quy)

app.listen(9000, () => {
    console.log("Server is running!");
  });