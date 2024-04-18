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
const TaiNguyen = require("../Model/TaiNguyenModel.js");

const GetYear = (value) => {
  const Year = value.split("/");
  return parseInt(Year[2]);
};

const GetQuy = (value) => {
  const GetMonth = value.split("/");
  const Month = parseInt(GetMonth[1]);
  if (Month <= 3) {
    return 1;
  } else if (Month <= 6) {
    return 2;
  } else if (Month <= 9) {
    return 3;
  } else {
    return 4;
  }
};

const HandleInsert = async (ThanhVien, Phong) => {
  try {
    const LocalDay = new Date();
    const CurrentYear = LocalDay.getFullYear();
    if (ThanhVien && ThanhVien.length >= 1) {
      for (const i of ThanhVien) {
        var Year = GetYear(i.NgayTao);
        var LoopNumber = CurrentYear - Year;
        var Quy = GetQuy(i.NgayTao);
        for (let e = 0; e <= LoopNumber; e++) {
          for (let f = 4; f >= Quy; Quy++) {
            const Check = await Phong.find({ Ma: i.Ma, Quy: Quy, Nam: Year });
            if (!Check || Check.length === 0) {
              const New = new Phong({
                Ma: i.Ma,
                Ten: i.Ten,
                SoTien: 0,
                Nam: Year,
                Quy: Quy,
                FullDay: "Empty",
              });
              await New.save();
              if (Quy === 4) {
                Quy = 1;
                break;
              }
            }
          }
          Year++;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

uri.get("/XuLyDuLieu", async (req, res) => {
  try {
    const DaoTao = await PhongDaoTao.find();
    const CongTac = await PhongCongTac.find();
    const HCQT = await PhongHCQT.find();
    const KhaoThi = await PhongKhaoThi.find();
    const KHTC = await PhongKHTC.find();
    HandleInsert(DaoTao, QuyPDaoTao);
    HandleInsert(CongTac, QuyPCongTac);
    HandleInsert(HCQT, QuyPHCQT);
    HandleInsert(KhaoThi, QuyPKhaoThi);
    HandleInsert(KHTC, QuyPKHTC);
    res.send({ Status: "Success" });
  } catch (error) {
    console.log(error);
    res.send({ Status: "Fauld" });
  }
});

uri.post("/PhongDaoTao", async (req, res) => {
  try {
    const List = await QuyPDaoTao.find({
      Nam: req.body.Nam,
      Quy: req.body.Quy,
    });
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/PhongCongTac", async (req, res) => {
  try {
    const List = await QuyPCongTac.find({
      Nam: req.body.Nam,
      Quy: req.body.Quy,
    });
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/PhongHCQT", async (req, res) => {
  try {
    const List = await QuyPHCQT.find({ Nam: req.body.Nam, Quy: req.body.Quy });
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/PhongKhaoThi", async (req, res) => {
  try {
    const List = await QuyPKhaoThi.find({
      Nam: req.body.Nam,
      Quy: req.body.Quy,
    });
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/PhongKHTC", async (req, res) => {
  try {
    const List = await QuyPKHTC.find({ Nam: req.body.Nam, Quy: req.body.Quy });
    if (List && List.length !== 0) {
      res.send(List);
    } else {
      res.send({ Status: "Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.get("/TongQuy", async (req, res) => {
  const TongQuy = await TaiNguyen.find();
  res.send(TongQuy);
});

uri.post("/ChinhSuaThanhVien", async (req, res) => {
  try {
    const Type = req.body.Loai;
    const TongQuy = await TaiNguyen.find();
    const TongTien = TongQuy[0].TongTien;
    if (Type === "DaoTao") {
      const User = await QuyPDaoTao.findById(req.body._id);
      const OldMoney = User.SoTien;
      await TaiNguyen.findByIdAndUpdate(TongQuy[0]._id, {
        $set: { TongTien: TongTien - OldMoney + parseInt(req.body.SoTien)},
      });
      await QuyPDaoTao.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            Quy: req.body.Quy,
            Nam: req.body.Nam,
            SoTien: parseInt(req.body.SoTien),
            FullDay: req.body.FullDay,
          },
        }
      );
      res.send({ Status: "Success" });
    } else if (Type === "CongTac") {
      const User = await QuyPCongTac.findById(req.body._id);
      const OldMoney = User.SoTien;
      await TaiNguyen.findByIdAndUpdate(TongQuy[0]._id, {
        $set: { TongTien: TongTien - OldMoney + parseInt(req.body.SoTien) },
      });
      await QuyPCongTac.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            Quy: req.body.Quy,
            Nam: req.body.Nam,
            SoTien: parseInt(req.body.SoTien),
            FullDay: req.body.FullDay,
          },
        }
      );
      res.send({ Status: "Success" });
    } else if (Type === "KHTC") {
      const User = await QuyPKHTC.findById(req.body._id);
      const OldMoney = User.SoTien;
      await TaiNguyen.findByIdAndUpdate(TongQuy[0]._id, {
        $set: { TongTien: TongTien - OldMoney + parseInt(req.body.SoTien) },
      });
      await QuyPKHTC.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            Quy: req.body.Quy,
            Nam: req.body.Nam,
            SoTien: parseInt(req.body.SoTien),
            FullDay: req.body.FullDay,
          },
        }
      );
      res.send({ Status: "Success" });
    } else if (Type === "KhaoThi") {
      const User = await QuyPKhaoThi.findById(req.body._id);
      const OldMoney = User.SoTien;
      await TaiNguyen.findByIdAndUpdate(TongQuy[0]._id, {
        $set: { TongTien: TongTien - OldMoney + parseInt(req.body.SoTien) },
      });
      await QuyPKhaoThi.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            Quy: req.body.Quy,
            Nam: req.body.Nam,
            SoTien: parseInt(req.body.SoTien),
            FullDay: req.body.FullDay,
          },
        }
      );
      res.send({ Status: "Success" });
    } else if (Type === "HCQT") {
      const User = await QuyPHCQT.findById(req.body._id);
      const OldMoney = User.SoTien;
      await TaiNguyen.findByIdAndUpdate(TongQuy[0]._id, {
        $set: { TongTien: TongTien - OldMoney + parseInt(req.body.SoTien) },
      });
      await QuyPHCQT.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            Quy: req.body.Quy,
            Nam: req.body.Nam,
            SoTien: parseInt(req.body.SoTien),
            FullDay: req.body.FullDay,
          },
        }
      );
      res.send({ Status: "Success" });
    } else {
      res.send({ Status: "Fauld" });
    }
  } catch (err) {
    console.log(err);
  }
});

uri.post("/LaySoTienThanhVien", async (req, res) => {
  try {
    const Type = req.body.Loai;
    if (Type === "DaoTao") {
      const User = await QuyPDaoTao.findById(req.body._id);
      res.send({SoTien: User.SoTien});
    } else if (Type === "CongTac") {
      const User = await QuyPCongTac.findById(req.body._id);
      res.send({SoTien: User.SoTien});
    } else if (Type === "KHTC") {
      const User = await QuyPKHTC.findById(req.body._id);
      res.send({SoTien: User.SoTien});
    } else if (Type === "KhaoThi") {
      const User = await QuyPKhaoThi.findById(req.body._id);
      res.send({SoTien: User.SoTien});
    } else if (Type === "HCQT") {
      const User = await QuyPHCQT.findById(req.body._id);
      res.send({SoTien: User.SoTien});
    } else {
      res.send({ Status: "Fauld" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = uri;
