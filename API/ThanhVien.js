const uri = require("express").Router();
const QuyPDaoTao = require("../Model/QuyPDaoTaoModel.js");
const QuyPCongTac = require("../Model/QuyPCongTacModel.js");
const QuyPHCQT = require("../Model/QuyPHCQTModel.js");
const QuyPKhaoThi = require("../Model/QuyPKhaoThiModel.js");
const QuyPKHTC = require("../Model/QuyPKHTCModel.js");
const PhongDaoTao = require("../Model/PhongDaoTaoModel.js");
const PhongCongTac = require("../Model/PhongCongTacModel.js");
const PhongHCQT = require("../Model/PhongHCQTModel.js");
const PhongKhaoThi = require("../Model/PhongKhaoThiModel.js");
const PhongKHTC = require("../Model/PhongKHTCModel.js");
const DoanVien = require("../Model/DoanVienModel.js");
const ChucVu = require("../Model/ChucVuModel.js");

const GetDay = () => {
  const NTN = new Date();
  const Ngay = NTN.getDate();
  const Thang = NTN.getMonth() + 1;
  const Nam = NTN.getFullYear();
  return Ngay + "/" + Thang + "/" + Nam;
};

uri.get("/ChucVu", async (req, res) => {
  try {
    const Loai = await ChucVu.find();
    res.send(Loai);
  } catch (error) {
    console.log(error);
  }
});

uri.get("/PhongDaoTao", async (req, res) => {
  try {
    const List = await PhongDaoTao.find();
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.get("/PhongCongTac", async (req, res) => {
  try {
    const List = await PhongCongTac.find();
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.get("/PhongHCQT", async (req, res) => {
  try {
    const List = await PhongHCQT.find();
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.get("/PhongKhaoThi", async (req, res) => {
  try {
    const List = await PhongKhaoThi.find();
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.get("/PhongKHTC", async (req, res) => {
  try {
    const List = await PhongKHTC.find();
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.get("/DoanVien", async (req, res) => {
  try {
    const List = await DoanVien.find();
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/XoaThanhVien", async (req, res) => {
  try {
    const Type = req.body.Loai;
    if (Type === "DaoTao") {
      await PhongDaoTao.deleteOne({ Ma: req.body.Ma });
      await QuyPDaoTao.deleteMany({Ma: req.body.Ma})
      res.send({ Status: "Success" });
    } else if (Type === "CongTac") {
      await PhongCongTac.deleteOne({ Ma: req.body.Ma });
      await QuyPCongTac.deleteMany({Ma: req.body.Ma})
      res.send({ Status: "Success" });
    } else if (Type === "KHTC") {
      await PhongKHTC.deleteOne({ Ma: req.body.Ma });
      await QuyPKHTC.deleteMany({Ma: req.body.Ma})
      res.send({ Status: "Success" });
    } else if (Type === "KhaoThi") {
      await PhongKhaoThi.deleteOne({ Ma: req.body.Ma });
      await QuyPKhaoThi.deleteMany({Ma: req.body.Ma})
      res.send({ Status: "Success" });
    } else if (Type === "HCQT") {
      await PhongHCQT.deleteOne({ Ma: req.body.Ma });
      await QuyPHCQT.deleteMany({Ma: req.body.Ma})
      res.send({ Status: "Success" });
    } else if (Type === "DoanVien") {
      await DoanVien.deleteOne({ Ma: req.body.Ma });
      res.send({ Status: "Success" });
    } else {
      res.send({ Status: "Fauld" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ThemThanhVien", async (req, res) => {
  try {
    const Type = req.body.Loai;
    if (Type === "DaoTao") {
      const New = new PhongDaoTao({
        Ma: req.body.Ma,
        Ten: req.body.Ten,
        Email: req.body.Email,
        ChucVu: req.body.ChucVu,
        DiaChi: req.body.DiaChi,
        Loai: Type,
        NgayTao: GetDay(),
        SDT: req.body.sdt,
      });
      await New.save();
      res.send({ Status: "Success" });
    } else if (Type === "CongTac") {
      const New = new PhongCongTac({
        Ma: req.body.Ma,
        Ten: req.body.Ten,
        Email: req.body.Email,
        ChucVu: req.body.ChucVu,
        DiaChi: req.body.DiaChi,
        Loai: Type,
        NgayTao: GetDay(),
        SDT: req.body.sdt,
      });
      await New.save();
      res.send({ Status: "Success" });
    } else if (Type === "HCQT") {
      const New = new PhongHCQT({
        Ma: req.body.Ma,
        Ten: req.body.Ten,
        Email: req.body.Email,
        ChucVu: req.body.ChucVu,
        DiaChi: req.body.DiaChi,
        Loai: Type,
        NgayTao: GetDay(),
        SDT: req.body.sdt,
      });
      await New.save();
      res.send({ Status: "Success" });
    } else if (Type === "KhaoThi") {
      const New = new PhongKhaoThi({
        Ma: req.body.Ma,
        Ten: req.body.Ten,
        Email: req.body.Email,
        ChucVu: req.body.ChucVu,
        DiaChi: req.body.DiaChi,
        Loai: Type,
        NgayTao: GetDay(),
        SDT: req.body.sdt,
      });
      await New.save();
      res.send({ Status: "Success" });
    } else if (Type === "KHTC") {
      const New = new PhongKHTC({
        Ma: req.body.Ma,
        Ten: req.body.Ten,
        Email: req.body.Email,
        DiaChi: req.body.DiaChi,
        ChucVu: req.body.ChucVu,
        Loai: Type,
        NgayTao: GetDay(),
        SDT: req.body.sdt,
      });
      await New.save();
      res.send({ Status: "Success" });
    } else if (Type === "DoanVien") {
      const New = new DoanVien({
        Ma: req.body.Ma,
        Ten: req.body.Ten,
        Email: req.body.Email,
        DiaChi: req.body.DiaChi,
        ChucVu: req.body.ChucVu,
        Loai: Type,
        NgayTao: GetDay(),
        SDT: req.body.sdt,
      });
      await New.save();
      res.send({ Status: "Success" });
    } else {
      res.send({ Status: "Fauld" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ThongTinThanhVien", async (req, res) => {
  try {
    const Loai = req.body.Loai;
    let ThanhVien;
    switch (Loai) {
      case "DaoTao":
        ThanhVien = await PhongDaoTao.findOne({ Ma: req.body.Ma });
        res.send(ThanhVien);
        break;
      case "CongTac":
        ThanhVien = await PhongCongTac.findOne({ Ma: req.body.Ma });
        res.send(ThanhVien);
        break;
      case "KHTC":
        ThanhVien = await PhongKHTC.findOne({ Ma: req.body.Ma });
        res.send(ThanhVien);
        break;
      case "KhaoThi":
        ThanhVien = await PhongKhaoThi.findOne({ Ma: req.body.Ma });
        res.send(ThanhVien);
        break;
      case "HCQT":
        ThanhVien = await PhongHCQT.findOne({ Ma: req.body.Ma });
        res.send(ThanhVien);
        break;
      case "DoanVien":
        ThanhVien = await DoanVien.findOne({ Ma: req.body.Ma });
        res.send(ThanhVien);
        break;
      default:
        res.send({ Status: "Fauld" });
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/ChinhSuaThanhVien", async (req, res) => {
  try {
    const Loai = req.body.Loai;
    switch (Loai) {
      case "DaoTao":
        await PhongDaoTao.findOneAndUpdate(
          { Ma: req.body.Ma },
          {
            $set: {
              Ten: req.body.Ten,
              ChucVu: req.body.ChucVu,
              SDT: req.body.SDT,
              Email: req.body.Email,
              DiaChi: req.body.DiaChi,
            },
          }
        );
        res.send({ Status: "Success" });
        break;
      case "CongTac":
        await PhongCongTac.findOneAndUpdate(
          { Ma: req.body.Ma },
          {
            $set: {
              Ten: req.body.Ten,
              ChucVu: req.body.ChucVu,
              SDT: req.body.SDT,
              Email: req.body.Email,
              DiaChi: req.body.DiaChi,
            },
          }
        );
        res.send({ Status: "Success" });
        break;
      case "KHTC":
        await PhongKHTC.findOneAndUpdate(
          { Ma: req.body.Ma },
          {
            $set: {
              Ten: req.body.Ten,
              ChucVu: req.body.ChucVu,
              SDT: req.body.SDT,
              Email: req.body.Email,
              DiaChi: req.body.DiaChi,
            },
          }
        );
        res.send({ Status: "Success" });
        break;
      case "KhaoThi":
        await PhongKhaoThi.findOneAndUpdate(
          { Ma: req.body.Ma },
          {
            $set: {
              Ten: req.body.Ten,
              ChucVu: req.body.ChucVu,
              SDT: req.body.SDT,
              Email: req.body.Email,
              DiaChi: req.body.DiaChi,
            },
          }
        );
        res.send({ Status: "Success" });
        break;
      case "HCQT":
        await PhongHCQT.findOneAndUpdate(
          { Ma: req.body.Ma },
          {
            $set: {
              Ten: req.body.Ten,
              ChucVu: req.body.ChucVu,
              SDT: req.body.SDT,
              Email: req.body.Email,
              DiaChi: req.body.DiaChi,
            },
          }
        );
        res.send({ Status: "Success" });
        break;
      case "DoanVien":
        await DoanVien.findOneAndUpdate(
          { Ma: req.body.Ma },
          {
            $set: {
              Ten: req.body.Ten,
              ChucVu: req.body.ChucVu,
              SDT: req.body.SDT,
              Email: req.body.Email,
              DiaChi: req.body.DiaChi,
            },
          }
        );
        res.send({ Status: "Success" });
        break;
      default:
        res.send({ Status: "Fauld" });
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = uri;
