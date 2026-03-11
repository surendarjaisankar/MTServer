const mongoose = require("mongoose");

const TariffSchema = new mongoose.Schema(
{
  vehicleType: {
    type: String,
    required: true,
  },
  baseFare: {
    type: Number,
    required: true,
  },
  perKmRate: {
    type: Number,
    required: true,
  },
  perMinuteRate: {
    type: Number,
    required: true,
  },
  minimumFare: {
    type: Number,
    required: true,
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("Tariff", TariffSchema);
