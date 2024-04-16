const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Loai: {
        type: String
    }
})

module.exports = mongoose.model("ChucVu", Schema, "ChucVu")