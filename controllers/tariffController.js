const Tariff = require("../models/Tariff");

/**
 * Save or update tariff
 */
exports.saveTariff = async (req, res) => {
  try {
    const {
      vehicleType,
      baseFare,
      perKmRate,
      perMinuteRate,
      minimumFare
    } = req.body;

    const tariff = await Tariff.findOneAndUpdate(
      { vehicleType },
      {
        vehicleType,
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

    res.status(200).json({
      success: true,
      data: tariff
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to save tariff"
    });
  }
};


/**
 * Get all tariffs
 */
exports.getTariffs = async (req, res) => {
  try {

    const tariffs = await Tariff.find();

    res.status(200).json({
      success: true,
      data: tariffs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tariffs"
    });
  }
};
