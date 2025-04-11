const mongoose = require('mongoose');

const InstrumentSchema = new mongoose.Schema({
  assetName: {
    type: String,
    required: [true, 'Please provide an asset name'],
    trim: true,
    maxlength: [100, 'Asset name cannot be more than 100 characters']
  },
  assetCode: {
    type: String,
    unique: true,
    trim: true,
    maxlength: [50, 'Asset code cannot be more than 50 characters']
  },
  manufacturer: {
    type: String,
    trim: true,
    maxlength: [100, 'Manufacturer name cannot be more than 100 characters']
  },
  model: {
    type: String,
    trim: true,
    maxlength: [100, 'Model cannot be more than 100 characters']
  },
  serialNumber: {
    type: String,
    trim: true,
    maxlength: [100, 'Serial number cannot be more than 100 characters']
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot be more than 50 characters']
  },
  purchaseDate: {
    type: Date
  },
  cost: {
    type: Number
  },
  department: {
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
    required: [true, 'Please provide a department']
  },
  status: {
    type: String,
    enum: ['active', 'under_repair', 'condemned'],
    default: 'active'
  },
  lastMaintenance: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Instrument', InstrumentSchema);
