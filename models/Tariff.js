const mongoose = require("mongoose");

const TariffSchema = new mongoose.Schema(
{
  vehicleType: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  baseFare: {
    type: Number,
    required: true,
    min: 0
  },

  perKmRate: {
    type: Number,
    required: true,
    min: 0
  },

  perMinuteRate: {
    type: Number,
    required: true,
    min: 0
  },

  minimumFare: {
    type: Number,
    required: true,
    min: 0
  }

},
{ timestamps: true }
);

TariffSchema.index({ vehicleType: 1 });

module.exports = mongoose.model("Tariff", TariffSchema);
