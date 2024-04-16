const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Ma: {
        type: String,
        required: true,
    },
    Ten: {
        type: String,
        required: true,
    },
    SoTien: {
        type: Number
    },
    Nam: {
        type: Number
    },
    Quy: {
        type: Number
    },
    FullDay: {
        type: String
    }
})

module.exports = mongoose.model("QuyPKhaoThi", Schema, "QuyPKhaoThi")