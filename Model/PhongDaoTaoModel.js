const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Ma: {
    type: String,
    required: true,
    unique: true,
  },
  Ten: {
    type: String,
    required: true,
  },
  Loai: {
    type: String,
    required: true,
  },
  ChucVu: {
    type: String,
    required: true,
  },
  NgayTao: {
    type: String,
    required: true,
  },
  SDT: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  DiaChi: {
    type: String,
  },
});

module.exports = mongoose.model("PhongDaoTao", Schema, "PhongDaoTao");
