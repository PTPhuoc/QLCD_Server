const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    TongTien: {
        type: Number
    }
})

module.exports = mongoose.model("TaiNguyen", Schema, "TaiNguyen")