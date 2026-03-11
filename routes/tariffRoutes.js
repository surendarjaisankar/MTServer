const express = require("express");
const Tariff = require("../models/Tariff");

const router = express.Router();


// ----------------------
// GET ALL TARIFFS
// ----------------------
router.get("/", async (req, res) => {

  try {

    const tariffs = await Tariff.find().sort({ vehicleType: 1 });

    res.json({
      success: true,
      tariffs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// ----------------------
// GET TARIFF BY VEHICLE
// ----------------------
router.get("/:vehicleType", async (req, res) => {

  try {

    const tariff = await Tariff.findOne({
      vehicleType: req.params.vehicleType
    });

    if (!tariff) {

      return res.status(404).json({
        success: false,
        message: "Tariff not found"
      });

    }

    res.json({
      success: true,
      tariff
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// ----------------------
// CREATE TARIFF
// ----------------------
router.post("/", async (req, res) => {

  try {

    const {
      vehicleType,
      baseFare,
      perKmRate,
      perMinuteRate,
      minimumFare
    } = req.body;


    if (!vehicleType || baseFare == null || perKmRate == null) {

      return res.status(400).json({
        success: false,
        message: "vehicleType, baseFare, perKmRate required"
      });

    }

    const existing = await Tariff.findOne({ vehicleType });

    if (existing) {

      return res.status(400).json({
        success: false,
        message: "Tariff already exists"
      });

    }

    const tariff = new Tariff({
      vehicleType,
      baseFare,
      perKmRate,
      perMinuteRate,
      minimumFare
    });

    await tariff.save();

    res.status(201).json({
      success: true,
      tariff
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// ----------------------
// UPDATE TARIFF
// ----------------------
router.put("/:vehicleType", async (req, res) => {

  try {

    const {
      baseFare,
      perKmRate,
      perMinuteRate,
      minimumFare
    } = req.body;

    const tariff = await Tariff.findOneAndUpdate(

      { vehicleType: req.params.vehicleType },

      {
        baseFare,
        perKmRate,
        perMinuteRate,
        minimumFare
      },

      {
        new: true,
        upsert: true
      }

    );

    res.json({
      success: true,
      tariff
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// ----------------------
// DELETE TARIFF
// ----------------------
router.delete("/:vehicleType", async (req, res) => {

  try {

    await Tariff.findOneAndDelete({
      vehicleType: req.params.vehicleType
    });

    res.json({
      success: true,
      message: "Tariff deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;
